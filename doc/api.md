# E36 API documentation

Submit compliance data for a customer. This API can be used by KYC-ed entities of 
element36. The data need to be prepared accordig to Swiss Laws enforced by [Finma](finma.ch), 
who enforces  international ruling of [FATF](fatf.org). Element36 AG is 
supervised by [VQF](vqf.ch) who is auditing element36 AG. VQF is autited by finma. 

[TOC](./src/toc.md) or [single page version](./src/singlepage.md)

A demo server is currently set up at: 
- [Demo Exchange](http://demo.e36.io:3000) - click "Sign up". You may use "demo@element36.io" 
and "\_\_E36.io\_\_" for a quick test. The server will be reset daily, and it is not guaranteed that
the demo-user is around. You may register your own user anytime - enter arbitrary data for onboarding, 
as IBAN use any valid number like "DE89 3704 0044 0532 0130 00"
- [Demo Swagger UI](http://demo.e36.io:8090/swagger-ui.html#/user-api-controler) - select the proper API (cash36-compliance) 
at the dropdown on top-right, and look for "user-api-controler". Try to login with your created identity. 
- [Demo Compliance Desk](http://demo.e36.io:3001/) - Look [here](./src/admin-login.md) how to login. 


For a quick sneak, you may do following: 
- Log in with demo@element36 (or create your own user if demo-user  is not set up)
- Connect your Wallet to our demo-blockchain/RPC: demo.e36.io:8545 and add your Metamask-Wallet using the UI
- Buy EUR/CHF


For more information, visit [element36 AG](https://element36.io). 

