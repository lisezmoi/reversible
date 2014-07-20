BROWSERIFY=./node_modules/.bin/browserify
STYLUS=./node_modules/.bin/stylus

all: js css

js:
	$(BROWSERIFY) src/index.js > bundle.js

css:
	$(STYLUS) < index.styl > bundle.css

deps:
	npm install

.PHONY: all js css install
