require "awesome_print"
require "json"

raw_data = File.read('data.json')


puts "\n\nYour JSON file is being parsed pretty printed below \n\n"
parsed_json = JSON.parse(raw_data)

ap parsed_json
