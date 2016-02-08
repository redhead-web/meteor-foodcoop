# eway = ewayConnect 'key', 'password', 'sandbox'
#
# Meteor.methods
#   '/eway/testTransaction': () ->
#     response = eway.createTransaction ewayRapid.Enum.Method.DIRECT,
#       "Customer": {
#              "CardDetails": {
#                "Name": "John Smith",
#                "Number": "4444333322221111",
#                "ExpiryMonth": "12",
#                "ExpiryYear": "25",
#                "CVN": "123"
#              }
#           },
#           "Payment": {
#              "TotalAmount": 1000
#           },
#           "TransactionType": "Purchase"
#
#     if response.get('TransactionStatus')
#       console.log 'Payment successful! ID: ' + response.get('TransactionID')
#     else
#       errorCodes = response.get('ResponseMessage').split(', ')
#       errorCodes.forEach (errorCode) ->
#         console.log 'Response Message: ' + ewayRapid.getMessage(errorCode, 'en')
#
#     return response.get('TransactionStatus')
#
#