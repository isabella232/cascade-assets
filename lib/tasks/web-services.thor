class Cascade < Thor
  require 'httparty'
  require 'awesome_print'
  require 'nokogiri'
  require 'open-uri'


  desc "publish PAGE", "publishes PAGE"
  def publish_block(path)
    puts "publishing #{path}"
  end

  # ---------------------------------------------------------------------------- #
  #                                    search                                    #
  # ---------------------------------------------------------------------------- #
  # USAGE: thor cascade:search term
  desc 'publish asset_type asset_path',
       'Publish any Cascade Asset via CLI!!! Remember to `export CASCADE_USERNAME=foo` and `export CASCADE_PASSWORD=bar'
  def search(term)
    puts "term: #{term}"

    # * 1) BASE URL
    base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

    # * 2) REST API ACTION
    # https://wimops.chapman.edu/wiki/WWW#Key_Links
    # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
    rest_action = 'search'.to_s # ! Search requires trailing ?

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
    # set these in environment_variables.yml
    cascade_username = '?u=' + ENV['CASCADE_USERNAME']
    cascade_password = '&p=' + ENV['CASCADE_PASSWORD']
    puts 'cascade username ' + ENV['CASCADE_USERNAME']

    # the constructed url should look something like:
    # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

    url = base_url + rest_action + cascade_username + cascade_password
    puts 'url ' + url

    # Inspect response for required details below 👇
    response = HTTParty.get(url)
    # puts response.body['matches']

    response_json =
      HTTParty.post(
        url,
        body: { searchInformation: { searchTerms: 'academics' } }.to_json
      ).to_s

    puts ap(JSON.parse(response_json))
    map publish: :publish
  end

  # ---------------------------------------------------------------------------- #
  #                                    publish                                   #
  # ---------------------------------------------------------------------------- #
  # USAGE: thor cascade:publish page Chapman.edu/test-section/nick-test/test-publish
  desc 'publish asset_type asset_path',
       'Publish any Cascade Asset via CLI!!! Remember to `export CASCADE_USERNAME=foo` and `export CASCADE_PASSWORD=bar'
  def publish(asset_type, asset_path)
    puts "asset type: #{asset_type}"
    puts "asset type: #{asset_path}"

    # * 1) BASE URL
    base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

    # * 2) REST API ACTION
    # https://wimops.chapman.edu/wiki/WWW#Key_Links
    # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
    rest_action = 'publish/'.to_s # ! KEEP TRAILING SLASH

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
    # set these in environment_variables.yml
    cascade_username = '?u=' + `ruby -e 'p ENV["CASCADE_USERNAME"]'`.to_s
    cascade_password = '&p=' + `ruby -e 'p ENV["CASCADE_PASSWORD"]'`
    puts 'cascade username ' + `ruby -e 'p ENV["CASCADE_USERNAME"]'`

    # the constructed url should look something like:
    # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

    url =
      base_url + rest_action + asset_type + '/' + asset_path +
        cascade_username.delete('"') + cascade_password.delete('"')
    puts 'url ' + url

    # Inspect response for required details below 👇
    response = HTTParty.get(url)
    puts response.body

    puts 'Visit ' + asset_path
  end

  desc 'download HTML from URL',
       'USAGE: thor cascade:download https://www.chapman.edu'
  def download(url)
    puts 'url ' + url

    url_path = URI.parse(url).path
    puts 'url_path: ' + url_path

    static_directory = 'app/views/static' + File.dirname(url_path)
    static_filename = url_path.gsub('.aspx', '.html.erb')

    html = Nokogiri.HTML(URI.open(url, read_timeout: 300))
    body = html.css('body')

    puts 'static directory: ' + static_directory
    puts 'static filename: ' + static_filename
    puts 'static path: ' + static_directory

    FileUtils.mkdir(static_directory) unless File.directory?(static_directory)
    puts static_filename =
           File.basename(static_directory + url_path).gsub('.aspx', '.html.erb')
    File.write(static_directory + "/#{static_filename}", body)
    # I would like to eventually automatically generate:
    # an action: Chapman.edu/about/index would generate uninav#about_index
    # and the route `get 'uninav/about_index', to: 'uninav#about_index'
  end
end


