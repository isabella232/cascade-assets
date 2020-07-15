# https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html

# ---------------------------------------------------------------------------- #
#                            edit cascade-assets.xml                           #
# ---------------------------------------------------------------------------- #
desc "Replaces dev Chapman.edu/_cascade/blocks/html/cascade-assets with dist/staging/cascade-assets.xml"
task edit_cascade_assets: :environment do
  # * 1) BASE URL 
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = "read/".to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'block/' # ! KEEP TRAILING SLASH 

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  asset_path = "Chapman.edu/_cascade/blocks/html/cascade-assets" # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in application.yml (a la figaro 🐈)
  cascade_username = ENV['CASCADE_USERNAME']
  cascade_password = "&p=" + ENV['CASCADE_PASSWORD']

  # the constructed url should look something like:
  # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

  url = base_url + rest_action + asset_type + asset_path + cascade_username + cascade_password
  puts url

 # Inspect response for required details below 👇
  response = HTTParty.get(url)
  puts response.body

  response_xml = response["asset"]["xmlBlock"]["xml"]
  puts response_xml

 cascade_assets_changes='dist/staging/cascade-assets.xml'
 data = File.read(cascade_assets_changes)
 puts data
 response_body = data

 # Change URL for edit request
 url_post = base_url + 'edit/' + asset_type + asset_path + cascade_username + cascade_password

 # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆
 puts HTTParty.post(url_post, body: { asset: { xmlBlock: { xml: data, path: "_cascade/blocks/html/0-write-test", parentFolderId: "8516f0a9c04d744c610b81da2d21be44", siteName: "Chapman.edu", id: asset_path } } }.to_json)
end

# ---------------------------------------------------------------------------- #
#                           edit one-column data def                           #
# ---------------------------------------------------------------------------- #
desc "Updates Dev-Chapman.edu Data Definitions:Modular/1 Column (https://dev-cascade.chapman.edu/entity/open.act?id=c77aa6ffc04d744c4832d6753c63a730&type=structureddatadefinition&direct=true) 
with app/data_definitions/from_cascade/one_column.xml"
task edit_one_col_data_def: :environment do
 # * 1) BASE URL 
 base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

 # * 2) REST API ACTION
 # https://wimops.chapman.edu/wiki/WWW#Key_Links
 # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
 rest_action = "read/".to_s # ! KEEP TRAILING SLASH

 # * 3) ASSET TYPE
 # this is easy to find in cascade's edit/preview url.
 # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
 asset_type = 'structureddatadefinition/' # ! KEEP TRAILING SLASH 

 # * 4) ASSET PATH OR ID
 # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
 asset_path = "c77aa6ffc04d744c4832d6753c63a730" # ! NO TRAILING SLASH

 # * 5) SECRETS
 # set these in application.yml (a la figaro 🐈)
 cascade_username = '?u=' + ENV['CASCADE_USERNAME']
 cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

 # the constructed url should look something like:
 # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

 url = base_url + rest_action + asset_type + asset_path + cascade_username + cascade_password
#  puts url

# Inspect response for required details below 👇
 response = HTTParty.get(url)
#  puts response.body

 response_xml = response["asset"]["dataDefinition"]["xml"]
#  puts response_xml
puts "📝 Replacing Data Definitions:Modular/one_column with app/data_definitions/from_cascade/one_column.xml"
update_source='app/data_definitions/from_cascade/one_column.xml'
data = File.read(update_source)
# puts data
response_body = data

#  # Change URL for edit request
url_post = base_url + 'edit/' + asset_type + asset_path + cascade_username + cascade_password

#  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆
puts HTTParty.post(url_post, body: { asset: { dataDefinition: { xml: data, path: asset_path, parentContainerId: "f8d1f15cc04d744c54334eca7e6dd033", siteName: "Chapman.edu", id: asset_path } } }.to_json)
puts "🎉 View changes at https://dev-cascade.chapman.edu/entity/open.act?id=c77aa6ffc04d744c4832d6753c63a730&type=structureddatadefinition"
end

# ---------------------------------------------------------------------------- #
#                             edit two-col data def                            #
# ---------------------------------------------------------------------------- #
desc "Updates Dev-Chapman.edu Data Definitions:Modular/2 Column (https://dev-cascade.chapman.edu/entity/open.act?id=c77aa6ffc04d744c4832d6753c63a730&type=structureddatadefinition&direct=true) 
with app/data_definitions/from_cascade/one_column.xml"
task edit_two_col_data_def: :environment do
 # * 1) BASE URL 
 base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

 # * 2) REST API ACTION
 # https://wimops.chapman.edu/wiki/WWW#Key_Links
 # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
 rest_action = "read/".to_s # ! KEEP TRAILING SLASH

 # * 3) ASSET TYPE
 # this is easy to find in cascade's edit/preview url.
 # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
 asset_type = 'structureddatadefinition/' # ! KEEP TRAILING SLASH 

 # * 4) ASSET PATH OR ID
 # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
 asset_path = "f8d4de89c04d744c54334eca5dd3752c" # ! NO TRAILING SLASH

 # * 5) SECRETS
 # set these in application.yml (a la figaro 🐈)
 cascade_username = '?u=' + ENV['CASCADE_USERNAME']
 cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

 # the constructed url should look something like:
 # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

 url = base_url + rest_action + asset_type + asset_path + cascade_username + cascade_password
#  puts url

# Inspect response for required details below 👇
 response = HTTParty.get(url)
#  puts response.body

 response_xml = response["asset"]["dataDefinition"]["xml"]
#  puts response_xml
update_source='app/data_definitions/from_cascade/two_column.xml'
data = File.read(update_source)
# puts data
response_body = data

#  # Change URL for edit request
url_post = base_url + 'edit/' + asset_type + asset_path + cascade_username + cascade_password

puts "📝 Replacing Data Definitions:Modular/2 Column with app/data_definitions/from_cascade/two_column.xml"
#  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆
puts HTTParty.post(url_post, body: { asset: { dataDefinition: { xml: data, path: asset_path, parentContainerId: "f8d1f15cc04d744c54334eca7e6dd033", siteName: "Chapman.edu", id: asset_path } } }.to_json)
puts "🎉 View changes at https://dev-cascade.chapman.edu/entity/open.act?id=#{asset_path}&type=structureddatadefinition"
end

# ---------------------------------------------------------------------------- #
#                    edit two & three column primary content                   #
# ---------------------------------------------------------------------------- #

desc "Updates Dev-Chapman.edu/_cascade/formats/modular/PrimaryContent with .cascade-code/Chapman.edu/_cascade/formats/modular/PrimaryContent.vtl"
task edit_primary_content_2_3_col: :environment do
require "json"
  # * 1) BASE URL 
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = "read/".to_s # ! KEEP TRAILING SLASH
 
  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'format/' # ! KEEP TRAILING SLASH 
 
  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  asset_path = "Chapman.edu/_cascade/formats/modular/PrimaryContent" # ! NO TRAILING SLASH
 
  # * 5) SECRETS
  # set these in application.yml (a la figaro 🐈)
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']
 
  # the constructed url should look something like:
  # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password
 
  url = base_url + rest_action + asset_type + asset_path + cascade_username + cascade_password
 #  puts url
 
 # Inspect response for required details below 👇
  response = HTTParty.get(url)
 #  puts response.body
 
  response_xml = response["asset"]["scriptFormat"]["script"]
 #  puts response_xml
 update_source='.cascade-code/Chapman.edu/_cascade/formats/modular/PrimaryContent.vtl'
 data = File.read(update_source)
 response_body = data.gsub('"', "'")
 puts data
 
 #  # Change URL for edit request
 url_post = base_url + 'edit/' + asset_type + asset_path + cascade_username + cascade_password
 puts url_post
 puts "📝 Replacing Data Definitions:Modular/2 Column with app/data_definitions/from_cascade/two_column.xml"
 #  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆

puts HTTParty.post(url_post, body: { 
  "asset": {
    "scriptFormat": {
      "script": data,
      "parentFolderId": "f8bce98fc04d744c54334eca2392c22e",
      "parentFolderPath": "_cascade/formats/modular",
      "lastModifiedDate": "Apr 24, 2020, 3:19:03 PM",
      "lastModifiedBy": "nnadel",
      "createdDate": "Oct 10, 2014, 12:43:48 AM",
      "createdBy": "mthomas",
      "path": "_cascade/formats/modular/PrimaryContent",
      "siteId": "6fef14a3c04d744c610b81dac0a8d082",
      "siteName": "Chapman.edu",
      "tags": [],
      "name": "PrimaryContent",
      "id": "f9037d2ec04d744c54334ecabde0ebe7"
    }
  }
}.to_json)

 puts "🎉 View changes at https://dev-cascade.chapman.edu/entity/open.act?id=f9037d2ec04d744c54334ecabde0ebe7&type=format"
 end

desc "Updates Dev-Chapman.edu Data Definitions:Modular/3 Column (https://dev-cascade.chapman.edu/entity/open.act?id=c77aa6ffc04d744c4832d6753c63a730&type=structureddatadefinition&direct=true) 
with app/data_definitions/from_cascade/one_column.xml"
task edit_three_col_data_def: :environment do
 # * 1) BASE URL 
 base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

 # * 2) REST API ACTION
 # https://wimops.chapman.edu/wiki/WWW#Key_Links
 # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
 rest_action = "read/".to_s # ! KEEP TRAILING SLASH

 # * 3) ASSET TYPE
 # this is easy to find in cascade's edit/preview url.
 # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
 asset_type = 'structureddatadefinition/' # ! KEEP TRAILING SLASH 

 # * 4) ASSET PATH OR ID
 # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
 asset_path = "f8d5f76bc04d744c54334eca6b05957e" # ! NO TRAILING SLASH

 # * 5) SECRETS
 # set these in application.yml (a la figaro 🐈)
 cascade_username = '?u=' + ENV['CASCADE_USERNAME']
 cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

 # the constructed url should look something like:
 # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

 url = base_url + rest_action + asset_type + asset_path + cascade_username + cascade_password
#  puts url

# Inspect response for required details below 👇
 response = HTTParty.get(url)
#  puts response.body

 response_xml = response["asset"]["dataDefinition"]["xml"]
#  puts response_xml
update_source='app/data_definitions/from_cascade/three_column.xml'
data = File.read(update_source)
# puts data
response_body = data

#  # Change URL for edit request
url_post = base_url + 'edit/' + asset_type + asset_path + cascade_username + cascade_password
puts "📝 Replacing Data Definitions:Modular/3 Column with app/data_definitions/from_cascade/two_column.xml"

#  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆
puts HTTParty.post(url_post, body: { asset: { dataDefinition: { xml: data, path: asset_path, parentContainerId: "f8d1f15cc04d744c54334eca7e6dd033", siteName: "Chapman.edu", id: asset_path } } }.to_json)
puts "🎉 View changes at https://dev-cascade.chapman.edu/entity/open.act?id=#{asset_path}&type=structureddatadefinition"
end

desc "Pulls staging velocity formats to local machine"
task pull: :environment do
 # * 1) BASE URL 
   base_url = 'https://dev-cascade.chapman.edu/api/v1/'

 # * 2) REST API ACTION
 # https://wimops.chapman.edu/wiki/WWW#Key_Links
 # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
 rest_action = "read/" # ! KEEP TRAILING SLASH

 # * 3) ASSET TYPE
 # this is easy to find in cascade's edit/preview url.
 # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
 asset_type = 'folder/' # ! KEEP TRAILING SLASH 

 # * 4) ASSET PATH OR ID
 # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
 asset_path = "a8975632c0a81e4b22b523b84ee99921" # ! NO TRAILING SLASH

 # * 5) SECRETS
 # set these in application.yml (a la figaro 🐈)
 cascade_username = '?u=' + ENV['CASCADE_USERNAME']
 cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

 # the constructed url should look something like:
 # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

 url = base_url + rest_action + asset_type + asset_path + cascade_username + cascade_password

 puts url

 response = HTTParty.get(url)
 response = response.parsed_response

 widgets = response["asset"]["folder"]["children"]
 🔑 = response["asset"]["folder"]["children"]

 # # CREATE BACKUPS
 # TO DO: MIRROR CASCADE'S ACTUAL STRUCTURE AND PROGRAMMATICALLY ORGANIZE THESE INSTEAD OF DUMPING THEM INTO THE SAME FOLDER
 one_column_widgets_dir = "../../.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/one_column/"
 backup_dir = "../../.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/one_column/"
 FileUtils.mkdir_p(backup_dir) unless File.directory?(backup_dir)

 timestamp = Time.now.strftime('%H-%M-%S_%Y-%m-%d').to_s
 one_column_widgets_dir_backup = "../../.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/one_column-".concat(timestamp)

 FileUtils.cp_r one_column_widgets_dir, one_column_widgets_dir_backup
 
 response['asset']['folder']["children"].each do |child|
   # IDENTIFIERS
   id = child['id']
   format_url = 'https://dev-cascade.chapman.edu/api/v1/read/format/' + id + cascade_username + cascade_password
   puts "format_url: " + format_url

   # GET EACH FORMAT'S VELOCITY CODE FROM JSON RESPONSE - AKA "script"
   # See https://dev-cascade.chapman.edu/api/v1/read/format/a897589cc0a81e4b22b523b8d1b3a0af?u=USERNAME&p=PASSWORD
   response = HTTParty.get(format_url)
   response = response.parsed_response
   puts response["asset"]["scriptFormat"]["script"]
   format_name = response["asset"]["scriptFormat"]["name"]
   puts "format_name: " + format_name
   format_path = response["asset"]["scriptFormat"]["path"]
   puts "format_path: " + format_path

   current_formats_directory = format_path
   FileUtils.mkdir_p(current_formats_directory) unless File.directory?(current_formats_directory)

   filetype = ".vtl"
   # WRITE EACH TO A LOCAL FILE
   open(current_formats_directory + format_name + ".vtl", 'w') { |f|
     f.puts response["asset"]["scriptFormat"]["script"]
   }
   puts format_name.upcase!
 end

 system %(open "../../.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/one_column/")
end


# USAGE: rake publish TYPE=page/ PATH=Chapman.edu/test-section/nick-test/test-publish
# 👹note the trailing slash on the TYPE
task :publish do
  # * 1) BASE URL 
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = "publish/".to_s # ! KEEP TRAILING SLASH

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

  url = base_url + rest_action + ENV['TYPE'] + ENV['PATH'] + cascade_username + cascade_password
  puts url

 # Inspect response for required details below 👇
  response = HTTParty.get(url)
  puts response.body
end
