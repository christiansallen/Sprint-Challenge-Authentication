1. What is the purpose of using sessions?
   To store data for each user by using their userID which is sent through cookies.

2) What does bcrypt do to help us store passwords in a secure manner?
   It hashes passwords, essentially encrypting them. The hashed password can't simply be copy/pasted as the actual password, it'll need to be decrypted first.

3. What does bcrypt do to slow down attackers?
   Again, it encrypts the passwords so attackers can't run them through scripts super fast as opposed to a non-encrypted password which would get hacked in milliseconds.

4) What are the three parts of the JSON Web Token?
   Header, Payload, Signature
