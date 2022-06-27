# how i deployed this NODE JS app using babel
babel was set up for this repo
and thus the start script was a bit diff
so what we did is 
we made a procfile with command npm start
and also used this command to change the dependency installation config
in heroku
heroku config:set NPM_CONFIG_PRODUCTION=false
so that nodemon and babel was installed


## made with ♥ by Kanishka Gour and Samarth Singh