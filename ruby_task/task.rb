#!/usr/bin/env ruby
require 'awesome_print'
require 'json'
require 'colorize'
require 'multi_string_replace'


puts "This script is being run by #{ENV["PARAM_ADMIN"]} in #{ENV["ENVIRONMENT"]} environment"
puts
puts "Deployment platform is #{ENV["PLATFORM"]}"

puts "\n\nYour JSON file is being parsed pretty printed below \n\n"
begin
    parsed_json = JSON.parse(ENV["PARAM_JSON_DATA"])
    ap parsed_json
    
    puts `echo 'airplane_output_set #{JSON.generate(parsed_json).mreplace({'\'' => ''})}'`
 rescue
    puts "Could not parse your JSON input, please check and try again.".red
 end

