const fs = require('fs');
const ethers = require('ethers');
const fetch = require('node-fetch');
const randomGenerator = require('./src/randomgen');
const delay = require('delay');


const signupUser = (email, password, nickName, phoneNumber, phoneCountryCode, phoneCode, countryCode, city) => new Promise((resolve, reject) => {
	const data = {
		"email": email,
		"password": password,
		"nickName": nickName,
		"phoneNumber": phoneNumber,
		"phoneCountryCode": phoneCountryCode,
		"phoneCode": '+'+phoneCode,
		"countryCode": countryCode,
		"city": city  
	};
	fetch('https://api-prod.crypto-hunters.io/api/user/signup', {
		method: 'POST',
		headers: {
			'accept': 'application/json',
			'Accept-Encoding': 'gzip',
			'cache-control': 'no-cache, no-store, must-revalidate',
			'Connection': 'Keep-Alive',
			'Content-Type': 'application/json',
			'expires': '0',
			'Host': 'api-prod.crypto-hunters.io',
			'pragma': 'no-cache',
			'User-Agent': 'okhttp/4.9.2'
		},
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(res => {
		resolve(res);
	})
	.catch(err => {
		reject(err)
	})
});



const updateprofil = (nickName, about,countryCode,city,phoneNumber, phoneCountryCode, phoneCode,walletfix,fullName,authtoken,age ) => new Promise((resolve, reject) => {
	data = {
		"nickName": nickName,
		"about": about,
		"countryCode": countryCode,
		"city": city,
		"phoneNumber": phoneNumber,
		"phoneCountryCode": phoneCountryCode,
		"phoneCode": '+'+phoneCode,
		"externalWalletAddress": walletfix,
		"twitterLink": "https://twitter.com/"+nickName,
		"faceBookLink": "https://www.facebook.com/"+nickName,
		"fullName": fullName,
		"age": "25"
	}
	fetch('https://api-prod.crypto-hunters.io/api/user/update', {
		method: 'PUT',
		headers: {
			'accept': 'application/json',
			'Accept-Encoding': 'gzip',
			'authorization': 'Bearer '+authtoken,
			'cache-control': 'no-cache, no-store, must-revalidate',
			'Connection': 'Keep-Alive',
			'Content-Length': '366',
			'Content-Type': 'application/json',
			'expires': '0',
			'Host': 'api-prod.crypto-hunters.io',
			'pragma': 'no-cache',
			'User-Agent': 'okhttp/4.9.2',
		},
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(res => {
		resolve(res);
	})
	.catch(err => {
		reject(err)
	})
});





function generatePassword() {
	const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
	const numbers = '0123456789';
	const specialCharacters = '!@#$%';
	const randomUppercase = uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
	const randomLowercase = lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
	const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
	const randomSpecialChar = specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
	password = randomUppercase + randomLowercase + randomNumber + randomSpecialChar;
	const allCharacters = uppercaseLetters + lowercaseLetters + numbers + specialCharacters;
	for (let i = 4; i < 12; i++) {
		const randomChar = allCharacters[Math.floor(Math.random() * allCharacters.length)];
		password += randomChar;
	}
	const shuffledPassword = password.split('').sort(() => 0.5 - Math.random()).join('');
	return shuffledPassword;
}







(async () => {
	do{
		try{

		const wallet = ethers.Wallet.createRandom();
		walletaddress = wallet.address
		pk = wallet.privateKey
		// console.log(`WALLET => ${walletaddress} | PK => ${pk}`)
		const profil = await randomGenerator.genRdm('male', 'US', 20, 30, 'sound')
		nickName=profil.username
		randomnomorusername = Math.floor(Math.random() * (99 - 10 + 1)) + 10
		nickName=nickName+randomnomorusername
		phoneNumber = profil.phone
		phoneCountryCode='US'
		phoneCode=profil.countryCode
		countryCode='US'

		namalengkap=profil.name
		namalengkap = namalengkap.replace(/\./g, '').toLowerCase();
		email = namalengkap.replace(/\s/g, '')
		email = email+'@gmail.com'
		negara = 'United States'
		listkota =['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
		city = listkota[Math.floor(Math.random() * listkota.length)];
		password = generatePassword();
		age = profil.age

		email =email.toString();
		password =password.toString();
		nickName =nickName.toString();
		phoneNumber =phoneNumber.toString();
		phoneCountryCode =phoneCountryCode.toString();
		phoneCode =phoneCode.toString();
		countryCode =countryCode.toString();
		city = city.toString()
		age =age.toString();

		save = email+';'+ password+';'+ nickName+';'+''+walletaddress+ ';'+pk
		regist = await signupUser(email,password,nickName,phoneNumber,phoneCountryCode,phoneCode,countryCode,city)
		if(regist.success==true){
			authtoken = regist.result.authToken
			// console.log('Sukses Regist...')
			
			about = 'Hello My Name is '+namalengkap+' , Im From '+city
			walletfix = walletaddress
			fullName= namalengkap
			// console.log('Update Profil....')
			updateprofiloke = await updateprofil(nickName,about,countryCode,city,phoneNumber, phoneCountryCode, phoneCode,walletfix,fullName,authtoken,age)
			if (updateprofiloke.success==true) {
				await fs.appendFileSync("DONE.csv", save + '\n', "utf-8");
				console.log('SUKSES => '+email+' | '+ password+' | '+ nickName+' | '+walletaddress+' | '+pk)
			}
		}else{
			console.log(regist.result.details.MESSAGE)
		}
	}catch{
		
	}
	}while(true)
})();




