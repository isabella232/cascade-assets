desc 'Updates designated files with http://localhost:3000/_assets/master.css and http://localhost:3000/_assets/master.js'
task production_push_local_assets: :environment do
 
    # local_file = 'dist/staging/cascade-assets.xml'
    # html = Nokogiri.HTML(URI.open(local_file, read_timeout: 300))
    # p master_css = html.at('link[rel="stylesheet"]')['href']

    # edit_file('38511756c0a81e5f6fe7d60ebf83ec12', '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl' )


  #   File.delete('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb') if File.exist?('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb')

  #   FileUtils.cp('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl', '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb')
  `rake assets:precompile`
  localhost_css_contents = Net::HTTP.get(URI.parse('http://localhost:3000/_assets/master.css'))

  localhost_js_contents = Net::HTTP.get(URI.parse('http://localhost:3000/_assets/master.js'))
  # # puts localhost_css_contents.gsub( /\/\*.+?\*\// , "")
  # puts localhost_css_contents

    
  # open('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb', 'a') do |f|
  #   f.puts "<![CDATA[#protect 
  #     <style> 
  #     #{localhost_css_contents.force_encoding('utf-8').gsub( /\/\*.+?\*\// , "")}  
  #      </style>  
  #      #protect]]> "
  # end
  
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']


  # Chapman.edu/_assets/master-ed688107f1e1b642819e7dfd607c5c005f895c3a0971cc13b6f249328e3bdf101.css
  
  base_url = 'https://cascade.chapman.edu/api/v1/'.to_s
  url_post =
  base_url + 'edit/' + 'file' + 'Chapman.edu/test-section/nick-test/nick.css' + cascade_username +
    cascade_password
p url_post

  p HTTParty.post(
       url_post,
       body: {
        "asset": {
          "file": {
            "text": "#{localhost_css_contents.force_encoding('utf-8')}",
            "data": [
              104,
              101,
              108,
              108,
              111
            ],
            "rewriteLinks": false,
      "maintainAbsoluteLinks": false,
      "shouldBePublished": true,
      "shouldBeIndexed": true,
      "lastPublishedDate": "Nov 5, 2020 9:16:49 AM",
      "lastPublishedBy": "cscddev01500",
      "expirationFolderRecycled": false,
      "metadataSetId": "6fef14a3c04d744c610b81da9d165a27",
      "metadataSetPath": "Default",
      "metadata": {},
      "reviewOnSchedule": false,
      "reviewEvery": 180,
      "parentFolderId": "7f4306c1c0a81e411677d28d4eb74357",
      "parentFolderPath": "test-section/nick-test",
      "lastModifiedDate": "Nov 5, 2020 9:16:44 AM",
      "lastModifiedBy": "cscddev01500",
      "createdDate": "Nov 4, 2020 8:29:51 PM",
      "createdBy": "nnadel",
      "path": "test-section/nick-test/nick.css",
      "siteId": "6fef14a3c04d744c610b81dac0a8d082",
      "siteName": "Chapman.edu",
      "tags": [],
      "name": "nick.css",
      "id": "38511756c0a81e5f6fe7d60ebf83ec12"
          }
        },
        "success": true
      }.to_json
     )

     production_publish_asset('file', '38511756c0a81e5f6fe7d60ebf83ec12')

    #  JAVASCRIPT
    base_url + 'edit/' + 'file' + 'Chapman.edu/test-section/nick-test/nick.js' + cascade_username +
    cascade_password
p url_post

  p HTTParty.post(
       url_post,
       body: {
        "asset": {
          "file": {
            "text": "#{localhost_js_contents.force_encoding('utf-8')}",
            "data": [
              104,
              101,
              108,
              108,
              111
            ],
            "rewriteLinks": false,
      "maintainAbsoluteLinks": false,
      "shouldBePublished": true,
      "shouldBeIndexed": true,
      "lastPublishedDate": "Nov 10, 2020 11:00:54 AM",
      "lastPublishedBy": "nnadel",
      "expirationFolderRecycled": false,
      "metadataSetId": "6fef14a3c04d744c610b81da9d165a27",
      "metadataSetPath": "Default",
      "metadata": {
        "displayName": "",
        "title": "",
        "summary": "",
        "teaser": "",
        "keywords": "",
        "metaDescription": "",
        "author": ""
      },
      "reviewOnSchedule": false,
      "reviewEvery": 180,
      "parentFolderId": "7f4306c1c0a81e411677d28d4eb74357",
      "parentFolderPath": "test-section/nick-test",
      "lastModifiedDate": "Nov 10, 2020 11:05:30 AM",
      "lastModifiedBy": "nnadel",
      "createdDate": "Nov 10, 2020 11:00:31 AM",
      "createdBy": "nnadel",
      "path": "test-section/nick-test/nick.js",
      "siteId": "6fef14a3c04d744c610b81dac0a8d082",
      "siteName": "Chapman.edu",
      "tags": [],
      "name": "nick.js",
      "id": "3850e28bc0a81e5f6fe7d60e33f67983"
          }
        },
        "success": true
      }.to_json
     )

     production_publish_asset('file', '3850e28bc0a81e5f6fe7d60e33f67983')
     p url_post
  # edit_format(
  #   '567ec178c0a81e8a1e5ac2884450d7c2',
  #   '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb'
  # )

  
end


def production_publish_asset(asset_type, asset_path) 
  # * 1) BASE URL
  base_url = 'https://cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'publish/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = "#{asset_type}/" # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  asset_path = "#{asset_path}" # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in environment_variables.yml
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  # the constructed url should look something like:
  # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

  url =
    base_url + rest_action + asset_type + asset_path + cascade_username +
      cascade_password
  p url

  # Inspect response for required details below 👇
  response = HTTParty.get(url)
  p response.body
end