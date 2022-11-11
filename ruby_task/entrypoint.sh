#!/bin/bash
# Params are in environment variables as PARAM_{SLUG}, e.g. PARAM_USER_ID
echo "Printing env for debugging purposes:"
env

data='[{"id": 1, "name": "Gabriel Davis", "role": "Dentist"}, {"id": 2, "name": "Carolyn Garcia", "role": "Sales"}]'
# Show output to users. Documentation: https://docs.airplane.dev/tasks/output#log-output-protocol
echo "airplane_output_set ${data}"
