# Submit customer KYC data

- You need to have a validated account at element36.io. 
- Authenticate with your existing element36 user in Swagger or on your client-side using OAuth. 
- Check model for possible enum values. For submitting countries use international codes like AT for 
Austria or CH for Switzerland. The "data-controler" service gives access to possible values according
to FATF rules. 

## API Overview :

Select cash36-compliance on http://demo.element36.io:8090/swagger-ui-html: 

![select](../img/cash36-compliance.png)

Scroll down to user-api-controller and unfold. You should see this:

![unfold](../img/userApiController.png)



## Creating a new customer data set


Call `/api-v1/user/*` methods in the following order: 

- `/create-user`: Create a user (a customer) on the element36 platform. The 
Email will be used as ID throughout the API.  
- `/step-1`: Submit personal data.  
- `/step-2`: Important and explicit step to confirm beneficial ownership. This means, 
that the investor is really the one who is controlling the funds. If the user 
is not the actual owner (or beneficial owner) of the funds, this is currently not 
supported by the API. E.g. if an assistant does the onboarding for somebody else, 
then this would be a case which is not supported. 
- `/get-step-3-code/{userEmail}`: We need a "liveness" test. A user need to 
take a selfie, which contains a random word written on a paper. The photo
need to show face and the word on the same picture. The picture needs to 
be matched with the identity or passport documents.  
- `/step-3`: Submit documents and images of identities. Passport or identity, 
including a selfie-picture with the code of the previous step.
- `/step-4`: Answer questions of occupation, source of funds etc. 

The user can only be fully onboarded, if we also receive a bank transaction, 
which matches the data given in step-1.  
The bank information must be given in step-1. If KYC process is positive
and also bank transaction matches the data, then the user is KYC-ed, and
his funds are converted to EUR36 or CHF36. 

## Quick Test

To test your setup, 
try to create external user: 
http://demo.element36.io:8090/swagger-ui.html#/user-api-controler/createUserUsingPOST


## Additional functions for development

- `/dev/authenticate/{userEmail}`: What usualy is done by the compliance officers of element36, 
you can to for yourself on our development and demo servers. Call this function after
completing /step-4. This will validate the KYC data of the customer. 

- `/get-info/{userEmail}`: Get the onboarding status of a user. It contains two status fields.  
The `currentLevel` contains the actual status in terms of anti-money-laundering. Tier_0 means, 
that basically 
nothing can be done. After /step-1 the user is in the state Tier_1, where we accept
funds from a user and bank account, but do not actually mint EUR36 or CHF36. We hold the 
funds until the KYC process is completed or cancelled. The KYC process checks the meta 
data of a bank-transaction, which should be obviously linked to the customer - we compare  
the bank account's name with the name of the customer or beneficial owner. If the KYC
process cannot be completed in several days, then the funds are send back to the customer. 
`currentProcessStatus` gives insight how the KYC process evolves. The status `CLOSED` means, 
that there are no open issues, and "currentLevel" is a final decision. 
 

- `/dev/send-tokens-to`: In a development environment, you may simulate bank transactions of
your clients. If your client is successfully onboarded and also authenticated
(using `/dev/authenticate/{userEmail}` you may send funds to the wallet of your client. 
The system takes the `userEmail`, determines the wallet, address and sends EUR36 or CHF36
to the wallet. 

- The API uses `enums` which helps to use correct parameter values. Click on "model" of the API
to see to check for valid strings:

![enum](../img/enums.png)
 

 

