Rails.application.config.assets.version = '1.0'
Rails.application.config.assets.paths << Rails.root.join("node_modules")
Rails.application.config.assets.paths << Rails.root.join("vendor", "assets" )
Rails.application.config.assets.precompile += %w( *.js *.scss)
Rails.application.config.assets.precompile += %w(*.svg *.eot *.woff *.ttf)
Rails.application.config.assets.precompile += %w( requests/new)