# frozen_string_literal: true

desc "Runs forman start"
task serve: :environment do
  system("bundle exec foreman start")
end

desc "Starts serveo tunnel"
task serveo: :environment do
  login = Etc.getlogin
  local_tunnel = system("ssh -R #{login}:80:localhost:5000 serveo.net")
  puts local_tunnel
end

# Alias
task server: :environment do
  Rake::Task["serve"].invoke
  Rake::Task["serveo"].invoke
end
