require "awesome_print"
require "json"

raw_data = File.read('example.json')

parsed_json = JSON.parse(raw_data)

ap parsed_json
