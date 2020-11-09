desc 'Updates `Chapman.edu/_cascade/formats/modular/widgets/Collapsibles` with `.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Collapsibles`'
task push_noncompiled_assets: :environment do
 
    # local_file = 'dist/staging/cascade-assets.xml'
    # html = Nokogiri.HTML(URI.open(local_file, read_timeout: 300))
    # p master_css = html.at('link[rel="stylesheet"]')['href']

    # edit_file('96ab024cc0a81e8a57740fffa611a0af', '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl' )


  #   File.delete('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb') if File.exist?('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb')

  #   FileUtils.cp('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl', '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb')

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
  
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s
  url_post =
  base_url + 'edit/' + 'file' + '_assets/master-ed688107f1e1b642819e7dfd607c5c005f895c3a0971cc13b6f249328e3bdf101.css' + cascade_username +
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
            "lastPublishedDate": "Nov 5, 2020 12:36:14 PM",
            "lastPublishedBy": "cscddev01500",
            "expirationFolderRecycled": false,
            "metadataSetId": "6fef14a3c04d744c610b81da9d165a27",
            "metadataSetPath": "Default",
            "metadata": {},
            "reviewOnSchedule": false,
            "reviewEvery": 180,
            "parentFolderId": "fd5121b0c04d744c42ab23aa0aba0ba8",
            "parentFolderPath": "_assets",
            "lastModifiedDate": "Nov 5, 2020 12:34:38 PM",
            "lastModifiedBy": "cscddev01500",
            "createdDate": "Nov 5, 2020 12:34:38 PM",
            "createdBy": "cscddev01500",
            "path": "_assets/master-ed688107f1e1b642819e7dfd607c5c005f895c3a0971cc13b6f249328e3bdf10.css",
            "siteId": "6fef14a3c04d744c610b81dac0a8d082",
            "siteName": "Chapman.edu",
            "tags": [],
            "name": "master-ed688107f1e1b642819e7dfd607c5c005f895c3a0971cc13b6f249328e3bdf10.css",
            "id": "9a1e4c0fc0a81e8a57740fff022b9d11"
          }
        },
        "success": true
      }.to_json
     )

     publish_asset('file', '9a1e4c0fc0a81e8a57740fff022b9d11')

    #  JAVASCRIPT
    base_url + 'edit/' + 'file' + '_assets/master-2531a8a8277542900a52c268edd56316b1fa2e4ecc44c802e02a47f8009e59c7.js' + cascade_username +
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
            "lastPublishedDate": "Nov 5, 2020 12:36:14 PM",
            "lastPublishedBy": "cscddev01500",
            "expirationFolderRecycled": false,
            "metadataSetId": "6fef14a3c04d744c610b81da9d165a27",
            "metadataSetPath": "Default",
            "metadata": {},
            "reviewOnSchedule": false,
            "reviewEvery": 180,
            "parentFolderId": "fd5121b0c04d744c42ab23aa0aba0ba8",
            "parentFolderPath": "_assets",
            "lastModifiedDate": "Nov 5, 2020 12:34:38 PM",
            "lastModifiedBy": "cscddev01500",
            "createdDate": "Nov 5, 2020 12:34:38 PM",
            "createdBy": "cscddev01500",
            "path": "_assets/master-2531a8a8277542900a52c268edd56316b1fa2e4ecc44c802e02a47f8009e59c7.js",
            "siteId": "6fef14a3c04d744c610b81dac0a8d082",
            "siteName": "Chapman.edu",
            "tags": [],
            "name": "_assets/master-2531a8a8277542900a52c268edd56316b1fa2e4ecc44c802e02a47f8009e59c7.js",
            "id": "9a1e4c0fc0a81e8a57740fff022b9d11"
          }
        },
        "success": true
      }.to_json
     )

     publish_asset('file', '9a1e4c0fc0a81e8a57740fff022b9d11')

  # edit_format(
  #   '567ec178c0a81e8a1e5ac2884450d7c2',
  #   '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb'
  # )

  
end