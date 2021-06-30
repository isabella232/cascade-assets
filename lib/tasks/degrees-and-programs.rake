desc 'Runs the grunt build task for cascade-assets/subprojects/degrees-and-programs/source/static'
task build_dandp: :environment do
  p `cd subprojects/degrees-and-programs/source/static/ && grunt build --force`
end