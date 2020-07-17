# https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html

# ---------------------------------------------------------------------------- #
#                            edit cascade-assets.xml                           #
# ---------------------------------------------------------------------------- #
desc 'Updates dev Chapman.edu/_cascade/blocks/html/cascade-assets with dist/staging/cascade-assets.xml'
task edit_cascade_assets: :environment do
  edit_block(
    'Chapman.edu/_cascade/blocks/html/cascade-assets',
    'dist/staging/cascade-assets.xml'
  )
end

# ---------------------------------------------------------------------------- #
#                           edit one-column data def                           #
# ---------------------------------------------------------------------------- #
desc 'Updates Dev-Chapman.edu Data Definitions:Modular/1 Column (https://dev-cascade.chapman.edu/entity/open.act?id=c77aa6ffc04d744c4832d6753c63a730&type=structureddatadefinition&direct=true) 
with app/data_definitions/from_cascade/one_column.xml'
task edit_one_col_data_def: :environment do
  edit_data_def(
    'c77aa6ffc04d744c4832d6753c63a730',
    'app/data_definitions/from_cascade/one_column.xml'
  )
end

# ---------------------------------------------------------------------------- #
#                             edit two-col data def                            #
# ---------------------------------------------------------------------------- #
desc 'Updates Dev-Chapman.edu Data Definitions:Modular/2 Column (https://dev-cascade.chapman.edu/entity/open.act?id=c77aa6ffc04d744c4832d6753c63a730&type=structureddatadefinition&direct=true) 
with app/data_definitions/from_cascade/one_column.xml'
task edit_two_col_data_def: :environment do
  edit_data_def(
    'f8d4de89c04d744c54334eca5dd3752c',
    'app/data_definitions/from_cascade/two_column.xml'
  )
end

# ---------------------------------------------------------------------------- #
#                    edit two & three column primary content                   #
# ---------------------------------------------------------------------------- #

desc 'Updates Dev-Chapman.edu/_cascade/formats/modular/PrimaryContent with .cascade-code/Chapman.edu/_cascade/formats/modular/PrimaryContent.vtl'
task edit_primary_content_2_3_col: :environment do
  edit_format(
    '_cascade/formats/modular/PrimaryContent',
    '.cascade-code/Chapman.edu/_cascade/formats/modular/PrimaryContent.vtl'
  )
end

desc 'Updates Dev-Chapman.edu Data Definitions:Modular/3 Column (https://dev-cascade.chapman.edu/entity/open.act?id=c77aa6ffc04d744c4832d6753c63a730&type=structureddatadefinition&direct=true) 
with app/data_definitions/from_cascade/one_column.xml'
task edit_three_col_data_def: :environment do
  edit_data_def(
    'f8d5f76bc04d744c54334eca6b05957e',
    'app/data_definitions/from_cascade/three_column.xml'
  )
end

# USAGE: rake publish TYPE=page/ PATH=Chapman.edu/test-section/nick-test/test-publish
# 👹note the trailing slash on the TYPE
task :publish do
  # * 1) BASE URL
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'publish/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  ENV['TYPE'] # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  ENV['PATH'] # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in application.yml (a la figaro 🐈)
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  # the constructed url should look something like:
  # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

  url =
    base_url + rest_action + ENV['TYPE'] + ENV['PATH'] + cascade_username +
      cascade_password
  puts url

  # Inspect response for required details below 👇
  response = HTTParty.get(url)
  puts response.body
end

def birth(file)
  Time.at(`stat -f%B "#{file}"`.chomp.to_i)
end

def edit_format(asset_path, update_source)
  require 'json'
  # * 1) BASE URL
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'read/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'format/' # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  asset_path = 'Chapman.edu/_cascade/formats/modular/PrimaryContent' # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in application.yml (a la figaro 🐈)
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  # the constructed url should look something like:
  # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

  url =
    base_url + rest_action + asset_type + asset_path + cascade_username +
      cascade_password
  #  puts url

  # Inspect response for required details below 👇
  response = HTTParty.get(url)
  #  puts response.body
  response_xml = response['asset']['scriptFormat']['script']

  response_xml = response['asset']['scriptFormat']['xml']
  site_name = response['asset']['scriptFormat']['siteName']
  response_name = response['asset']['scriptFormat']['name']
  response_path = response['asset']['scriptFormat']['path']
  response_path_full = site_name + '/' + response_path

  parent_container_id = response['asset']['scriptFormat']['parentContainerId']
  asset_id = response['asset']['scriptFormat']['id']

  backup_strategy(response_path_full, response)

  #  puts response_xml
  update_source = "#{update_source}"
  data = File.read(update_source)
  response_body = data.gsub('"', "'")
  puts data

  #  # Change URL for edit request
  url_post =
    base_url + 'edit/' + asset_type + asset_path + cascade_username +
      cascade_password
  puts url_post
  puts '📝 Replacing Data Definitions:Modular/2 Column with app/data_definitions/from_cascade/two_column.xml'
  
  #  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆

  puts HTTParty.post(
         url_post,
         body: {
           "asset": {
             "scriptFormat": {
               "script": data,
               "parentFolderId": 'f8bce98fc04d744c54334eca2392c22e',
               "parentFolderPath": '_cascade/formats/modular',
               "lastModifiedDate": 'Apr 24, 2020, 3:19:03 PM',
               "lastModifiedBy": 'nnadel',
               "createdDate": 'Oct 10, 2014, 12:43:48 AM',
               "createdBy": 'mthomas',
               "path": asset_path,
               "siteId": '6fef14a3c04d744c610b81dac0a8d082',
               "siteName": 'Chapman.edu',
               "tags": [],
               "name": 'PrimaryContent',
               "id": 'f9037d2ec04d744c54334ecabde0ebe7'
             }
           }
         }.to_json
       )

  puts "🎉 View changes at https://dev-cascade.chapman.edu/entity/open.act?id=#{
         asset_id
       }&type=#{asset_type}".chomp('/')
end

def edit_data_def(asset_path, update_source)
  # * 1) BASE URL
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION - we'll first read to make a backup
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'read/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'structureddatadefinition/' # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but Cascade's naming scheme whitespace makes it annoying.
  asset_path = "#{asset_path}" # ! NO TRAILING SLASH
  puts asset_path
  # * 5) SECRETS
  # set these in application.yml (a la figaro 🐈)
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  # the constructed url should look something like:
  # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

  url =
    base_url + rest_action + asset_type + asset_path + cascade_username +
      cascade_password
  #  puts url

  # Inspect response for required details below 👇
  response = HTTParty.get(url)
  #  puts response.body

  response_xml = response['asset']['dataDefinition']['xml']
  site_name = response['asset']['dataDefinition']['siteName']
  response_name = response['asset']['dataDefinition']['name']
  response_path = response['asset']['dataDefinition']['path']
  response_path_full = site_name + '/' + response_path

  parent_container_id = response['asset']['dataDefinition']['parentContainerId']
  asset_id = response['asset']['dataDefinition']['id']

  backup_strategy(response_path_full, response)

  puts "📝 Replacing #{response_path_full} with #{update_source}"
  update_source = "#{update_source}"
  data = File.read(update_source)
  # puts data
  response_body = data

  #  # Change URL for edit request
  url_post =
    base_url + 'edit/' + asset_type + asset_path + cascade_username +
      cascade_password

  #  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆
  puts HTTParty.post(
         url_post,
         body: {
           asset: {
             dataDefinition: {
               xml: data,
               path: asset_path,
               parentContainerId: parent_container_id,
               siteName: site_name,
               id: asset_id
             }
           }
         }.to_json
       )
  puts "🎉 View changes at https://dev-cascade.chapman.edu/entity/open.act?id=#{
         asset_id
       }&type=#{asset_type}".chomp('/')
end

def edit_block(asset_path, update_source)
  # * 1) BASE URL
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'read/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'block/' # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  asset_path = "#{asset_path}" # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in application.yml (a la figaro 🐈)
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  url =
    base_url + rest_action + asset_type + asset_path + cascade_username +
      cascade_password

  puts url

  response = HTTParty.get(url)
  puts response.body

  puts response_xml = response['asset']['xmlBlock']['xml']
  puts asset_id = response['asset']['xmlBlock']['id']
  puts site_name = response['asset']['xmlBlock']['siteName']
  puts response_name = response['asset']['xmlBlock']['name']
  puts response_path = response['asset']['xmlBlock']['path']
  puts parent_folder_id = response['asset']['xmlBlock']['parentFolderId']

  response_path_full = site_name + '/' + response_path

  response_xml = response['asset']['xmlBlock']['xml']
  puts response_xml

  backup_strategy(response_path_full, response)

  cascade_assets_changes = 'dist/staging/cascade-assets.xml'

  data = File.read(cascade_assets_changes)
  puts data

  response_body = data

  url_post =
    base_url + 'edit/' + asset_type + asset_path + cascade_username +
      cascade_password

  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆
  # HTTParty.post(url_post, body: { asset: { xmlBlock: { xml: data, path: "_cascade/blocks/html/0-write-test", parentFolderId: parent_folder_id, siteName: "Chapman.edu", id: "365ae5dec0a81e8a20b1d746fd3e0778" } } }.to_json)

  puts HTTParty.post(
         url_post,
         body: {
           asset: {
             xmlBlock: {
               xml: data,
               path: asset_path,
               parentFolderId: parent_folder_id,
               siteName: site_name,
               id: asset_id
             }
           }
         }.to_json
       )
  puts "🎉 View changes at https://dev-cascade.chapman.edu/entity/open.act?id=#{
         asset_id
       }&type=#{asset_type}".chomp('/')
end

def backup_strategy(response_path_full, response)
  backup_filename = response_path_full.gsub('/', '_').gsub('.', '_')
  asset_type = "#{asset_type}"
  site_name = "#{site_name}"

  backup_dir = "_sites/#{site_name}#{asset_type}/#{backup_filename}/"
  puts "backup_dir: #{backup_dir}"
  puts "👼 Backing up Cascade asset in #{backup_dir}"
  FileUtils.mkdir_p(backup_dir) unless File.directory?(backup_dir)
  time = Time.now

  backup_files_count =
    Dir[File.join(backup_dir, '**', '*')].count { |file| File.file?(file) }.to_i
  backup_files_max = 10
  backup_file_oldest =
    Dir[backup_dir + '*.bak'].sort_by { |f| File.ctime(f) }.last(1)[0]

  if backup_files_count <= backup_files_max
    File.write(
      backup_dir + backup_filename + '__' + time.strftime('%m-%d-%Y.%H.%M.%S') +
        '.bak',
      response['asset']
    )
  else
    puts "🚨 Reached file backup limit ( #{backup_files_max} )"
    puts "♻️  Overwriting oldest backup ( #{backup_file_oldest} )"
    File.write(backup_file_oldest, response['asset'])
    puts
  end
end
