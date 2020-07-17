class Cascade < Thor
    require 'httparty'
    require "awesome_print"

    # ---------------------------------------------------------------------------- #
    #                                    search                                    #
    # ---------------------------------------------------------------------------- #
    # USAGE: thor cascade:search term
    desc "publish asset_type asset_path", "Publish any Cascade Asset via CLI!!! Remember to `export CASCADE_USERNAME=foo` and `export CASCADE_PASSWORD=bar"
    def search(term)
        puts "term: #{term}"

        # * 1) BASE URL 
        base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

        # * 2) REST API ACTION
        # https://wimops.chapman.edu/wiki/WWW#Key_Links
        # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
        rest_action = "search".to_s # ! Search requires trailing ?

        # * 3) ASSET TYPE
        # this is easy to find in cascade's edit/preview url.
        # ie https://dev-cascade.chapman.edu/api/v1/search?u=
        # asset_type = 'page/' # ! KEEP TRAILING SLASH 
        # asset_type = #{asset_type}
        
        # * 4) ASSET PATH OR ID
        # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
        # asset_path = "Chapman.edu/test-section/nick-test/test-publish" # ! NO TRAILING SLASH
        # asset_path = #{asset_path}

        # * 5) SECRETS
        # set these in application.yml (a la figaro 🐈)
        cascade_username = '?u=' + ENV['CASCADE_USERNAME']
        cascade_password = '&p=' + ENV['CASCADE_PASSWORD']      
        puts 'cascade username ' + ENV["CASCADE_USERNAME"]

        # the constructed url should look something like:
        # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password
        
        url = base_url + rest_action + cascade_username + cascade_password
        puts 'url ' + url
        
        # Inspect response for required details below 👇
        response = HTTParty.get(url)
        # puts response.body['matches']

        response_json = HTTParty.post(url, body: {
            searchInformation: {        
              searchTerms: 'academics'
            }
          }.to_json).to_s

        puts ap(JSON.parse(response_json))
        map publish: :publish
    end


    # ---------------------------------------------------------------------------- #
    #                                    PUBLISH                                   #
    # ---------------------------------------------------------------------------- #
    # USAGE: thor cascade:publish page Chapman.edu/test-section/nick-test/test-publish
    desc "publish asset_type asset_path", "Publish any Cascade Asset via CLI!!! Remember to `export CASCADE_USERNAME=foo` and `export CASCADE_PASSWORD=bar"
    def publish(asset_type, asset_path)
        puts "asset type: #{asset_type}"
        puts "asset type: #{asset_path}"

        # * 1) BASE URL 
        base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

        # * 2) REST API ACTION
        # https://wimops.chapman.edu/wiki/WWW#Key_Links
        # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
        rest_action = "publish/".to_s # ! KEEP TRAILING SLASH
        
        # * 3) ASSET TYPE
        # this is easy to find in cascade's edit/preview url.
        # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
        # asset_type = 'page/' # ! KEEP TRAILING SLASH 
        # asset_type = #{asset_type}
        
        # * 4) ASSET PATH OR ID
        # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
        # asset_path = "Chapman.edu/test-section/nick-test/test-publish" # ! NO TRAILING SLASH
        # asset_path = #{asset_path}
        # * 5) SECRETS
        # set these in application.yml (a la figaro 🐈)
        cascade_username = '?u=' + `ruby -e 'p ENV["CASCADE_USERNAME"]'`.to_s
        cascade_password = '&p=' +`ruby -e 'p ENV["CASCADE_PASSWORD"]'`
        puts 'cascade username ' + `ruby -e 'p ENV["CASCADE_USERNAME"]'`

        # the constructed url should look something like:
        # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password
        
        url = base_url + rest_action + asset_type  + '/' + asset_path + cascade_username.delete('"') + cascade_password.delete('"')
        puts 'url ' + url
        
        # Inspect response for required details below 👇
        response = HTTParty.get(url)
        puts response.body

        puts "Visit https:dev-www." + asset_path + ".aspx"
    end


    desc "download HTML from URL", "USAGE: thor cascade:download https://www.chapman.edu"
    def download(url)
        puts "url " + url
        require 'nokogiri'
        require 'fileutils'
        # url = Nokogiri::HTML(URI.open('https://www.chapman.edu'))

        url_path = URI.parse(url).path  
        puts "url_path: " + url_path

        static_directory = "app/views/static"+ File.dirname(url_path) 
        static_filename= url_path.gsub(".aspx", ".html.erb")
        
        puts 'static directory: ' + static_directory
        puts 'stsatic filename: ' + static_filename
        
        html =  Nokogiri::HTML(URI.open(url, read_timeout: 300))
        body = html.css('body')
        # static_path = "app/views/static" + url_path.gsub(".aspx", ".html.erb")

        File.write('app/views/static' + static_filename , body)
        
        puts 'static path: ' + static_directory 
        
        FileUtils.mkdir(static_directory) unless File.directory?(static_directory)
        puts File.basename(url_path).gsub(".aspx", ".html.erb")
        # File.write(static_directory + "/" + File.basename(url_path).gsub(".aspx", ".html.erb"))
        # File.write(static_directory, html)


        # FileUtils.touch(`~/download/test.html`)
        # File.write(`~/download/test.html`, html)

        # FileUtils.mkdir_p static_path

        # File.open(yourfile, 'w') { |file| file.write("your text") }

        # File.write('~/Downloads/hello.txt', 'Some glorious content')
        # FileUtils.mkdir(static_path) unless File.directory?(static_path)
        # FileUtils.touch(static_path) unless File.directory?(static_path)

        # File.write(static_path, html)

    end
end
