desc 'Runs the grunt build task for cascade-assets/subprojects/degrees-and-programs/source/static'
task build_dandp: :environment do
  p `cd subprojects/degrees-and-programs/source/static/ && grunt build --force`
  # replaces dev-Cascade's JS with recent build 
  Rake::Task['edit_dandp_js'].invoke
end

desc 'Runs the grunt serve task for cascade-assets/subprojects/degrees-and-programs/source/static'
task serve_dandp: :environment do
  p `cd subprojects/degrees-and-programs/source/static/ && grunt server --force`
  # replaces dev-Cascade's JS with recent build 
end