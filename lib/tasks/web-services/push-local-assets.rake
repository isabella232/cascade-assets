desc 'updates specified file with http://localhost:3000/_assets/master.css and http://localhost:3000/_assets/master.js'
task push_noncompiled_assets: :environment do

  `rake assets:precompile`
  localhost_css_contents = Net::HTTP.get(URI.parse('http://localhost:3000/_assets/master.css'))

  localhost_js_contents = Net::HTTP.get(URI.parse('http://localhost:3000/_assets/master.js'))

  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']
  
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s
  url_post =
  base_url + 'edit/' + 'file' + 'Chapman.edu/test-section/nick-test/homepage-featured-callouts.css' + cascade_username +
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
      "path": "test-section/nick-test/homepage-featured-callouts.css",
      "siteId": "6fef14a3c04d744c610b81dac0a8d082",
      "siteName": "Chapman.edu",
      "tags": [],
      "name": "homepage-featured-callouts.css",
      "id": "8f2a123ac0a81e8a3b0002936f3a7f52"
          }
        },
        "success": true
      }.to_json
     )

     publish_asset('file', '8f2a123ac0a81e8a3b0002936f3a7f52')

    #  JAVASCRIPT
    base_url + 'edit/' + 'file' + 'Chapman.edu/test-section/nick-test/homepage-featured-callouts.js' + cascade_username +
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
      "path": "test-section/nick-test/homepage-featured-callouts.js",
      "siteId": "6fef14a3c04d744c610b81dac0a8d082",
      "siteName": "Chapman.edu",
      "tags": [],
      "name": "homepage-featured-callouts.js",
      "id": "8f2a567bc0a81e8a3b00029341d8c97f"
          }
        },
        "success": true
      }.to_json
     )

     publish_asset('file', '8f2a567bc0a81e8a3b00029341d8c97f')
    #  system("open ~/workspace/cascade-assets/dist/_config/index.html")

  
end