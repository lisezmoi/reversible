BROWSERIFY=./node_modules/.bin/browserify
STYLUS=./node_modules/.bin/stylus

all: js css

dist:
	mkdir -p dist
	$(STYLUS) --compress < index.styl > dist/bundle.css
	$(BROWSERIFY) src/index.js | ./node_modules/.bin/uglifyjs > dist/bundle.js

js:
	mkdir -p dist
	$(BROWSERIFY) src/index.js > dist/bundle.js

css:
	mkdir -p dist
	$(STYLUS) < index.styl > dist/bundle.css

deps:
	npm install

.PHONY: all js css install dist
