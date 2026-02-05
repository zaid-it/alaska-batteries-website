// This would ideally live in js/data.js
const dealers = [
  { name: "Gujrat Battery - Rawat", address: "Main G.T Road, Rawat, Islamabad", city: "Islamabad", province: "Rawalpindi", contact: "0300-5334905" },
  { name: "Chontra Battery Agency and UPS - Rawalpindi", address: "Chakri Road, Biscuit Factory Chowk, Rawalpindi", city: "Rawalpindi", province: "Rawalpindi", contact: "0334-5055826" },
  { name: "Shah Battery Center - Rawalpindi", address: "Near Bilal Masjid Main Road, Pirwadhai, Rawalpindi", city: "Rawalpindi", province: "Rawalpindi", contact: "0305-6002942" },
  {
    name: "Ikram Battery Center - Ternol",
    address: "Shop#29-A Chaudhary Ayoub Market ( Bank Islami Market) G.T Road, Ternol, Islamabad",
    city: "Ternol",
    province: "Rawalpindi",
    contact: "0333-5189023",
  },
  { name: "Ashfaq Traders - Dinga", address: "Kharain Road, Dinga", city: "Dinga", province: "Rawalpindi", contact: "0336-6665465" },
  { name: "Quetta Battery & UPS Center - Chakwal", address: "Bhatti Market, Talagang Road, Chakwal", city: "Chakwal", province: "Rawalpindi", contact: "0336-5786782" },
  { name: "New Ilyas Battery Services - Fateh Jang", address: "Main Khour Road, Fateh Jang", city: "Fateh Jang", province: "Rawalpindi", contact: "0300-5312329" },
  { name: "Jawad Autos - Chakwal", address: "Haider Market, Main Talagang Road, Chakwal", city: "Chakwal", province: "Rawalpindi", contact: "0336-5915572" },
  { name: "Shafqat Battery Center - Manshera", address: "Opposite, Hascol Petrol Pump, Shahrahe Rashim, Manshera.", city: "Manshera", province: "Rawalpindi", contact: "0346-4484137" },
  { name: "Yasir Battery Service - Abbotabad", address: "Fawara Chowk, Abbotabad", city: "Abbotabad", province: "Rawalpindi", contact: "0316-5041226" },
  { name: "Modern Battery Centre & UPS - Islamabad", address: "Opp. PSO Pump, Main G.T. Road, Sawan Camp, Islamabad", city: "Islamabad", province: "Rawalpindi", contact: "0300-5015107" },
  { name: "Japan Tire & Battery - Haripur", address: "Near Shell Pump, Mohalla Tanki, G.T. Road Haripur", city: "Haripur", province: "Rawalpindi", contact: "0300-8325037" },
  { name: "Ali Traders - Rawalpindi", address: "Dheri Hasan Abad, Near Masjid Sheikhan, COD Road, Rawalpindi", city: "Rawalpindi", province: "Rawalpindi", contact: "0333-5395652" },
  { name: "Ittefaq Battery Agency - Rawalpindi", address: "Main High Court Road, Near Shell Pump, Rawalpindi", city: "Rawalpindi", province: "Rawalpindi", contact: "0321-9114300 / 0345-5223418" },
  {
    name: "Pak Autos & Battery Traders - Choa Syedan Shah",
    address: "Near Punjab Bank, Chakwal Road, Choa Syedan Shah",
    city: "Choa Syedan Shah",
    province: "Rawalpindi",
    contact: "0332-5656933 / 0345-5656933",
  },
  { name: "Anoosh And Shafel Traders - Rawalpindi", address: "Shop#4 Pindi Cricket Stadium Road, Rawalpindi", city: "Rawalpindi", province: "Rawalpindi", contact: "0333-5297132" },
  { name: "Sadat Autos & Battery House - Attock", address: "PSO Pump Truck Adda, Attock", city: "Attock", province: "Rawalpindi", contact: "0333-5608616" },
  {
    name: "New Khan Battery Center & Electric Spare Parts - Wah Cantt",
    address: "Hammad Plaza, Near Barrier No.2, G.T Road, Wah Cantt",
    city: "Wah Cantt",
    province: "Rawalpindi",
    contact: "0307-5702042",
  },
  { name: "S.B Traders - Mirpur", address: "Al-Ghosia Market Nangi Adda, Mirpur Azad Kashmir", city: "Mir Pur", province: "Rawalpindi", contact: "0342-5160008" },
  {
    name: "Irfan Battery Centre - Rawalpindi",
    address: "Shop#4324-A, Main Road Daryaabad, Gowalmandi, Rawalpindi",
    city: "Rawalpindi",
    province: "Rawalpindi",
    contact: "0336-0530520 / 0311-1519535",
  },
  { name: "New Light Battery Center - Rawalpindi", address: "Shop#02, Khurram Palaza, Main Haji Chowk, Sadiqabad, Rawalpindi", city: "Rawalpindi", province: "Rawalpindi", contact: "0322-8563075" },
  { name: "Nadeem And Company - Talagang", address: "Near Mega Save Mart, Mianwali Road, Talagang", city: "Talagang", province: "Rawalpindi", contact: "0300-5478650" },
  { name: "CH Battery Agency - Rawalpindi", address: "Street#135, Tahli Mori, Rawalpindi", city: "Rawalpindi", province: "Rawalpindi", contact: "0310-5006197 / 0319-7839839" },
  { name: "Pak Madina Battery Service - Rawalpindi", address: "Opposite HBL, Lethrar Road, Khan Pull Islamabad.", city: "Rawalpindi", province: "Rawalpindi", contact: "0300-7357482 / 0333-7662128" },
  { name: "Prince Battery Center - Rawalpindi", address: "Shop#3, Awami Plaza, National Market, Chandni Chowk, Rawalpindi", city: "Rawalpindi", province: "Rawalpindi", contact: "0317-7666507" },
  { name: "Bashir & Brothers Battery & Sollar - Bannu", address: "Shop#03, New Cantt Market, Miranshah Road, Bannu", city: "Bannu", province: "KPK", contact: "0333-1919384" },
  { name: "Nihal Battery House - Jehangira", address: "Near UBL Bank, G.T Road Jehangira, District Nowshera", city: "Jehangira", province: "KPK", contact: "0312-5986486" },
  { name: "Mezan Traders - Peshawar", address: "Ittefaq Market Near Darwesh Super Centre Jamil Chowk Ring Road, Peshawar", city: "Peshawer", province: "KPK", contact: "0300-5933833 / 0345-8931333" },
  { name: "M/S New Mezan Traders - Peshawar", address: "Opposite Derwaish Plaza, Jameel Chowk, Ring Road, Peshawar", city: "Peshawer", province: "KPK", contact: "0334-9000872 / 0300-5992005" },
  { name: "Bilal Traders - Peshawar", address: "Shop#5, Amin Colony, Opposite Lal Plaza, Haji Camp G.T.Road, Peshawar", city: "Peshawer", province: "KPK", contact: "0313-9030990 / 0313-9334422" },
  { name: "United Auto & Battery House - Batkhela", address: "Near Old Dir Adda, Main Bazar, Batkhela, District Malakand", city: "Batkhela", province: "KPK", contact: "0348-9111366" },
  { name: "Alhafiz Oil & Battery - D. I. Khan", address: "Faisal Market, Near Auto Center Market, Bannu Road, D.I.Khan", city: "D.I.Khan", province: "KPK", contact: "0346-0220797 / 0346-9900098" },
  { name: "Sartaj Autos Electric Parts Center - Timergara", address: "Shoba Market, Timergara", city: "Timergara", province: "KPK", contact: "0301-8889501 / 301-8016902" },
  { name: "Irfan Uddin & Brothers - Landi Kotal", address: "G-18, Shinwari Market, Landikotal Bazar, Landikotal", city: "Landikotal", province: "KPK", contact: "0302-5900577" },
  { name: "Khyber Autos - Jumrud", address: "Shop#75-76 Block-D, Fauji Market, Jumrud Bazar, District Khyber", city: "Jumrud", province: "KPK", contact: "0334-9068973 / 0345-9232700" },
  { name: "Raza Tyre And Battery Center - Swabi", address: "Mardan Road, Swabi", city: "Swabi", province: "KPK", contact: "0345-8005010 / 0333-9432892" },
  { name: "Seven Star Electronics & Battery Commission Agent - Bajroh", address: "Main Bazar Anayat Killi, District, Bajorh", city: "Bajorh", province: "KPK", contact: "0300-4486839" },
  { name: "Al Hafiz Trader - Daggar", address: "Ali Sher Khail, P.O Jowar, Daggar Buner.", city: "Buner", province: "KPK", contact: "0312-2727272 / 0317-8314260" },
  { name: "Saleem Electronic Battery & Solar Centre - Totalai", address: "Saleem Market, Near Khyber Bank, Totalai, Buner", city: "Totalai", province: "KPK", contact: "0342-9748127 / 0316-0935954" },
  { name: "Noor Autos - Kohat", address: "Ashiq Colony, Industrial Area Bannu Road, Kohat", city: "Kohat", province: "KPK", contact: "0300-91550994 / 0332-9786465" },
  { name: "Awan Traders - Matta", address: "Opposite Attock Petrol Pump, Matta Road, Totkay, Swat", city: "Matta", province: "KPK", contact: "0345-1854466" },
  { name: "Khalid Battery & Solar - Wari", address: "Near Khyber Bank, Bala Bazar, Upper Dir Wari", city: "Wari", province: "KPK", contact: "0321-2975550 / 0313-2975550 / 0311-8180544" },
  { name: "Sajid Battery Center - Toppi", address: "Swabi Road, Khan Zaman Market, Near Meezan Bank, Topi", city: "Toppi", province: "KPK", contact: "0315-4871718" },
  { name: "Hozaifa Traders - Karak", address: "Jamil Market, Bannu Road, Main Bazar Karak", city: "Karak", province: "KPK", contact: "0333-9718115" },
  { name: "Muslim Battery Center - Peshawer", address: "Opp Shell Pump, Near National Kanta Ring Road, Peshawer", city: "Peshawer", province: "KPK", contact: "0300-5929194 / 0340-5036465" },
  { name: "Niazi Battery Center - Tank", address: "Opposite, Old Bus Stand, Main Bazar, Tank", city: "Tank", province: "KPK", contact: "0304-9096412 / 0341-0090791" },
  { name: "Indus Battery Zone - Batkhela", address: "Near Papular CNG, G T Road, Batkhela", city: "Batkhela", province: "KPK", contact: "0300-5743617" },
  { name: "Bilal Traders - Kohat", address: "University Road, Kohat", city: "Kohat", province: "KPK", contact: "0300-91550994 / 0332-9786465" },
  { name: "M/S Ayaz Autos And Battery Center - Mingora", address: "G.T Road, Mingora", city: "Mingora", province: "KPK", contact: "0346-69405931" },
  { name: "Peshawar Battery Center - Nowshera", address: "Shop#21, Farooq Stadium Plaza, G.T Road, Nowshera Cantt", city: "Nowshera", province: "KPK", contact: "0301-8845317 / 0315-9231509" },
  { name: "M/S ISL Trading Company - Bannu", address: "University Plaza, Shop#15, Bannu", city: "Bannu", province: "KPK", contact: "0332-9745520" },
  { name: "M/S Jaddah Battery Center - Kohat", address: "Shinwari Market, Hango Road, Kohat", city: "Kohat", province: "KPK", contact: "0335-9641268" },
  { name: "M. Sufyan Battery and Solar System", address: "Karak Stand, New Adda, Bannu", city: "Bannu", province: "KPK", contact: "0300-5334870" },
  { name: "Sawab Gul Battery & Solar House - Sadda", address: "Shaheen Market, Sadda", city: "Sadda", province: "KPK", contact: "0336-9794004 / 0300-5851372" },
  { name: "New Rajput Battery - Lahore", address: "Shop#23, Montgomary Road, Lahore", city: "Lahore", province: "Lahore", contact: "0303-9012190 / 0302-5654286" },
  { name: "Ameen Traders - Lahore", address: "Chowk Misry Shah, Near Safed Masjid, Lahore", city: "Lahore", province: "Lahore", contact: "0321-0521000 / 0323-7104079" },
  { name: "Ali & Company - Lahore", address: "391, Block D3, Main WAPDA Avenue, WAPDA Town, Lahore", city: "Lahore", province: "Lahore", contact: "0326-1422809" },
  { name: "Naeem Traders - Lahore", address: "325 G.T.Road, Daroghawala, Lahore", city: "Lahore", province: "Lahore", contact: "0321-8262505" },
  { name: "Ali Battery Service - Lahore", address: "Opposite Kamahan Meto Station, 17-K.M. Ferozpur Road, Lahore", city: "Lahore", province: "Lahore", contact: "0308-4444357" },
  { name: "Star Enterprises - Lahore", address: "Near Niazi Stand, Bund Road, Lahore", city: "Lahore", province: "Lahore", contact: "0300-8801701" },
  { name: "Asad Trading Company - Lahore", address: "Shop#6, New LMC Market Bdami Bagh, Lahore", city: "Lahore", province: "Lahore", contact: "0300-6986600" },
  { name: "Golden Traders - Pattoki", address: "Multan Road, Pattoki", city: "Pattoki", province: "Lahore", contact: "0300-4238439" },
  { name: "Umer Battery Service - Lahore", address: "Shop#35, Street#9, New Iqbal Park, Opposite Adil Hospital, DHA, Lahore", city: "Lahore", province: "Lahore", contact: "0300-9437894" },
  { name: "Master Battery Traders - Lahore", address: "Multan Road, Opposite Mansoora, Multan Chungi, Lahore", city: "Lahore", province: "Lahore", contact: "0300-9415522" },
  { name: "Mansha Battery Service - Sheikhupura", address: "Faisalabad Road, Sheikhupura", city: "Sheikhupura", province: "Lahore", contact: "0300-4930949" },
  { name: "Waqas Battery Service - Ali Pur Chattha", address: "Near Tayyab Motor Showroom, Qadirabad Road, Ali Pur Chattha", city: "Ali Pur Chattha", province: "Lahore", contact: "0321-4865611" },
  { name: "Muhammad Ali Battery Service - Kusur", address: "Near Chowk Qadir Abad Road, Kasur", city: "Kasur", province: "Lahore", contact: "0300-8290574" },
  { name: "Bismillah Battery Specialist - Kasur", address: "Pull Qatal Garhi, Katchery Road, Near Mukarma Bank, Kasur", city: "Kasur", province: "Lahore", contact: "0321-6571662" },
  { name: "Kohat Traders - Lahore", address: "Outside Masti Gate, Circular Road, Badami Bagh, Lahore", city: "Lahore", province: "Lahore", contact: "0321-3220291" },
  { name: "Haji Ikram Butt Battery Service - Lahore", address: "1- Nicholson Road, Qila Gujjar Singh, Lahore", city: "Lahore", province: "Lahore", contact: "0322-4395535" },
  { name: "Shahzad Traders - Gujrat", address: "Near Eid Gah Masjid, G.T Road, Gujrat", city: "Gujrat", province: "Lahore", contact: "0320-9448971" },
  { name: "Tanveer Battery Center - Kamokee", address: "Shop#1, Near Bank of Punjab, G.T Road Kamokee, Gujranwala", city: "Kamokee", province: "Lahore", contact: "0300-6285637 / 0331-6285637" },
  { name: "Shahbaz Battery Service - Lahore", address: "Lahore Sargodha Road, Near Larri Adda Farooq Abad, Sheikhpura", city: "Farooq Abad", province: "Lahore", contact: "0300-6474574" },
  {
    name: "Ittefaq Battery House - Nankana Sahib",
    address: "Shop# 1979, Near Admore Pump, Lorry Adda Mangtanwala Road, Nankana Sahib",
    city: "Nankana Sahib",
    province: "Lahore",
    contact: "0322-7273824",
  },
  { name: "Nadeem Traders - Lahore", address: "Opposite Gourmet Bakery, Lahore Road, Raiwind, Lahore", city: "Lahore", province: "Lahore", contact: "0300-8035716" },
  { name: "Arain Traders - Ellahabad", address: "Chunian Road, Near Lahori Marriage Hall, Ellahabad, Tehsil Chunian, District Kasur", city: "Ellahabad", province: "Lahore", contact: "0302-4561045" },
  { name: "AR Battery - Lahore", address: "16 KM, Ferozpur Road, Kamahan Meto Stop, Bank Stop, Iqbal Town, Lahore", city: "Lahore", province: "Lahore", contact: "0307-4003580" },
  {
    name: "Bismillah Battery Store - Lahore",
    address: "Ghulam Muhammad Building, Sheikhupura Road, Jiya Mosa, Shahdara, Lahore",
    city: "Lahore",
    province: "Lahore",
    contact: "0307-6847310 / 0308-4917593",
  },
  { name: "Pakistan Battery Traders - Gujranwala", address: "Opposite Iqbal High School, G.T Road, Gujranwala", city: "Gujranwala", province: "Lahore", contact: "0321-4491782 / 0332-4701754" },
  { name: "Punjab Traders - Daska", address: "Near Shell Petrol Pump, Circular Road, Daska", city: "Daska", province: "Lahore", contact: "0300-6471441" },
  { name: "Ahmad Battery & UPS Sale & Service - Lahore", address: "Fazal Market Cannal Bank Road, Thokar Niaz Baig, Lahore", city: "Lahore", province: "Lahore", contact: "0305-8712244" },
  { name: "Bismillah Battery Service - Wazirabad", address: "Masjid Musafiran, Near Sapal Market, G.T. Road Wazirabad", city: "Wazirabad", province: "Lahore", contact: "0300-82029125" },
  { name: "Madina Battery Service - Lalamusa", address: "Oppsite side, Sabzi Mandi , GT Road Lalamusa", city: "Lalamusa", province: "Lahore", contact: "0300-4263721" },
  { name: "M/S Ismail Traders - Ferozwala", address: "Qazafi Park, Ferozwala", city: "Ferozwala", province: "Lahore", contact: "0317-7346946" },
  { name: "Makkah Battery Center - Lahore", address: "Samsani Road, Near Shadewal Chowk, Johar Town, Lahore", city: "Lahore", province: "Lahore", contact: "0304-4403501" },
  { name: "Japan Batteries - Narowal", address: "Zaffarwal Chowk, Circular Road, Narowal", city: "Narowal", province: "Lahore", contact: "0321-6509001" },
  { name: "M/S City Traders - Lahore", address: "Samsani Road near Pizza Hut Johar Town, Lahore", city: "Lahore", province: "Lahore", contact: "0300-5016501" },
  { name: "Al Ameer Traders - Ellahabad", address: "Allahabad Chunian Road", city: "Ellahabad", province: "Lahore", contact: "0305-3012815" },
  { name: "Nobel Traders - Lahore", address: "Akbar Chowk Town Ship, Lahore", city: "Lahore", province: "Lahore", contact: "0309-2614302" },
  { name: "Hassan Traders - Sialkot", address: "Ghalib Road, Puli Kammanwali, Sialkot", city: "Sialkot", province: "Lahore", contact: "0306-4068927" },
  { name: "Exide Sale And Service Centre - Okara", address: "G.T Road, Okara", city: "Okara", province: "Lahore", contact: "0300-1611829" },
  { name: "Butt Electrician - Manga Mandi", address: "Multan Road, Rajpoot Nagar Manga Mandi, Lahore", city: "Manga Mandi", province: "Lahore", contact: "0300-8751407" },
  {
    name: "Chaudhary Battery Store - Mandi Bahauddin",
    address: "General Bus Stand, Phalia Road, Mandi Bahauddin",
    city: "Mandi Bahauddin",
    province: "Faisalabad",
    contact: "0304-4888817 / 0345-4701318",
  },
  { name: "Shafique Batteries - Quaidabad", address: "Near Shell Petroleum, Quaidabad", city: "Quaidabad", province: "Faisalabad", contact: "0341-4890000 / 0315-6590000" },
  {
    name: "Shahid Enterprises - Faisalabad",
    address: "Shop#138-A, Shoaib Bilal Market, Near Mian Trust Market, Faisalabad",
    city: "Faisalabad",
    province: "Faisalabad",
    contact: "0301-2411747 / 0301-6779541",
  },
  { name: "Abdullah Traders - Jhang", address: "Sargodha Road, Madni Colony, Jhang Sadar, Jhang", city: "Jhang", province: "Faisalabad", contact: "0322-7661268" },
  { name: "Madina Auto Store - Bhekho More", address: "Bhekho More, Phalia Road, Mandi Bahauddin", city: "Bhekho More", province: "Faisalabad", contact: "0300-6032937" },
  { name: "Risen Trading Co. - Jauharabad", address: "Balouch Market Near Bus Stand, Jauharabad, Khushab", city: "Jauharabad", province: "Faisalabad", contact: "0300-0065094" },
  { name: "Saad Battery House - Shorkot", address: "Jhang Road, Near Sabir Chowk Shorkot", city: "Shorkot", province: "Faisalabad", contact: "0300-6163940 / 0315-6163940" },
  { name: "Deen Oil Traders and Farooq Battery Center - Darya Khan", address: "Dulley Wala Road, Darya Khan", city: "Darya Khan", province: "Faisalabad", contact: "0300-0677858" },
  { name: "Arham Traders - Toba Tek Singh", address: "Rajana Road, Opposite Larry Adda, Toba Tek Singh", city: "Toba Tek Singh", province: "Faisalabad", contact: "0334-1613611" },
  { name: "Lahore Battery Service & Auto Store - Mandi Shah Jewana", address: "Railway Crossing, Mandi Shah Jewana", city: "Mandi Shah Jewana", province: "Faisalabad", contact: "0301-4842500" },
  { name: "Imtiaz Traders - Faisalabad", address: "88-A Basement, Shoaib Bilal Market, Opp Commisioner Road, Faisalabad.", city: "Faisalabad", province: "Faisalabad", contact: "0321-6508981" },
  { name: "Tariq Battery Center - Sargodha", address: "Khayyam Chowk, Railway Road, Sargodha", city: "Sargodha", province: "Faisalabad", contact: "0346-7374605" },
  { name: "Nadeem Noor Battery And Solar - Malikwal", address: "Double Road Opposite, Mosque Town Committee, Tehsil Malikwal", city: "Malikwal", province: "Faisalabad", contact: "0300-9660830" },
  { name: "Baoo Jee Enterprises - Faisalabad", address: "Shop#77, Shoaib Bilal Market, Opp Mian Trust Market, Faisalabad", city: "Faisalabad", province: "Faisalabad", contact: "0300-6058400" },
  { name: "Hafiz Battery Center - 18 Hazari", address: "Jhang Road, Near PSO Pump, 18 Hazari, Distict Jhang", city: "18 Hazari", province: "Faisalabad", contact: "0345-5762657" },
  {
    name: "Ahsan Battery Solar & UPS Service Centre - More Khunda",
    address: "Mirza Haroon Battery Service UPS & Sollar Jaranwala Road More Khunda",
    city: "More Khunda",
    province: "Faisalabad",
    contact: "0324-6697095",
  },
  { name: "Saeed Traders - Sargodha", address: "Khushab Road, Sargodha", city: "Sargodha", province: "Faisalabad", contact: "0306-7509798" },
  { name: "Arslan Battery Service - Lodhran", address: "Daar ul Hadees Muhammadia Jalalpur More Lodhran", city: "Lodhran", province: "Multan", contact: "0301-4192819 / 0300-4902995" },
  { name: "Farooq Battery Center - Vehari", address: "Multan Road, Opposite Makki Masjid, Vehari", city: "Vehari", province: "Multan", contact: "0321-6030072" },
  { name: "Imran Gulzar Battery Service - Chowk Azam", address: "Multan Road, Chowk Azam", city: "Chowk Azam", province: "Multan", contact: "0302-7346080" },
  { name: "Nagri Peer Pathan Battery Store - Tonsa Sharif", address: "Hashmi Chowk, Tonsa Sharif", city: "Tonsa Sharif", province: "Multan", contact: "0300-7643347" },
  { name: "Khawaja Ilyas Battery Center - Jalalpur Pirwala", address: "Shujabad Road, Jalalpur Pirwala.", city: "Jalalpur Pirwala", province: "Multan", contact: "0301-7849354" },
  { name: "Shoaib Traders - D.G Khan", address: "Schani Colony, Near Pull Piyary Wali, D.G Khan", city: "D.G Khan", province: "Multan", contact: "0333-5894684" },
  { name: "Hassan Battery Services - Layyah", address: "Katchery Road, General Bus Stand , Layyah", city: "Layyah", province: "Multan", contact: "0301-7763880" },
  { name: "M/S Chaudhary Battery Traders - Jahanian", address: "Khanewal Road, Bypass Chowk, Jahanian", city: "Jahanian", province: "Multan", contact: "0300-5420000" },
  { name: "Makka Battery Service - Multan", address: "Chungi#06, Bosan Road, Multan", city: "Multan", province: "Multan", contact: "0303-6462441" },
  { name: "Saim Traders - Rahim Yar Khan", address: "Belgium Chowk, Shahi Road, Rahim Yar Khan", city: "Rahmi Yar Khan", province: "Multan", contact: "0300-7596632" },
  { name: "Imran Battery Center & Solar System - Rajan Pur", address: "Dera Ghazi Khan Road, Rajan Pur", city: "Rajan Pur", province: "Multan", contact: "0300-6349662" },
  { name: "Al Basit Traders - Rahim Yar Khan", address: "Khanpur Road, Near Punjab College, Rahim Yar Khan", city: "Rahmi Yar Khan", province: "Multan", contact: "0300-6713929" },
  { name: "Ajmal Traders - Khan Pur", address: "Chowk Deen Pur, Air Port Road, Khan Pur District, Rahim Yar Khan", city: "Khan Pur", province: "Multan", contact: "0334-2984631" },
  { name: "Hussnain Battery Service - Faqirwali", address: "Near Pathan Masjid, Highway Road, Faqirwali", city: "Faqirwali", province: "Multan", contact: "0300-8679922" },
  { name: "Ahmad Battery and Solar System - Mailsi", address: "Multan Road, Mailsi", city: "Mailsi", province: "Multan", contact: "0300-4653572" },
  { name: "Fugi Battery Service - Chishtian", address: "Cenima Road, Near Nazi Adda, Chishtian", city: "Chishtian", province: "Multan", contact: "0306-7577590 / 0346-8827473" },
  { name: "Ehsan Tyre & Battery Centre - Multan", address: "Masoom Shah Road, Opposite Alfalah Bank, Qazafi Chowk, Multan", city: "Multan", province: "Multan", contact: "300-7727408" },
  { name: "Adnan Bhutta Battery Center - Multan", address: "Al Tamash Road Gujjar Khadda, Near Gull Khan Kabaria, Multan", city: "Multan", province: "Multan", contact: "0300-6986809 / 0300-7544686" },
  { name: "Khawaja Imran Haider Autos - Uch Sharif", address: "Kutaney Wali Pull, Ali Pur Road, Uch Sharif", city: "Uch Sharif", province: "Multan", contact: "0300-7184007" },
  { name: "Bhayya Gee Battery Centre - Ahmedpur East", address: "Chowk Chacha Bsti, General Bus Stand, Ahmedpur East.", city: "Ahmedpur East", province: "Multan", contact: "0300-8542990" },
  { name: "Awais Battery Center - Jampur", address: "Near Traffic Chowk, Dera Road, Jampur", city: "Jampur", province: "Multan", contact: "0306-4731549" },
  { name: "Punjab Battery And Solar System - Lodhran", address: "Add, Permit, Near PSO Pump, Lodhran", city: "Lodhran", province: "Multan", contact: "0300-6859699" },
  { name: "Khan Battery & UPS Center - Muzaffar Garh", address: "Jhang More, Opposite Shell Pump, Muzaffar Garh", city: "Muzaffar Garh", province: "Multan", contact: "0336-6444889" },
  { name: "Ahmad Traders - Multan", address: "Opposite Ideal Bakery, Chungi#6, Bosan Road, Multan", city: "Multan", province: "Multan", contact: "0303-6750590 / 0333-6806060" },
  { name: "Majeed Battery Center - Alipur", address: "Ghani Ghoth Road, Tehsil Alipur, District Muzaffar Garh", city: "Alipur", province: "Multan", contact: "0300-6868708" },
  {
    name: "Al Makka Battery & Solar System - Muhammad Pur Dewan",
    address: "Dera Road, Muhammad Pur Dewan, Tehsil Jampur, District Rajanpur",
    city: "Muhammad Pur Dewan",
    province: "Multan",
    contact: "0302-3521432 / 0312-0111432",
  },
  { name: "Hassan Battery Services - Multan", address: "30-K, General Bus Stand, Vehari Chowk, Multan", city: "Multan", province: "Multan", contact: "0315-7679295" },
  { name: "Haq Bahoo Battery & Solar UPS Centre - Sadiq Abad", address: "Ghousia Chowk, K.L.P Road, Sadiqabad", city: "Sadiqabad", province: "Multan", contact: "0333-6459345" },
  { name: "Noor Ulain Traders - Khanewal", address: "Fazal Park Road, Khanewal", city: "Khanewal", province: "Multan", contact: "0303-7206373" },
  { name: "Khanewal Traders - Kabirwala", address: "General Bus Stand, Kabirwala", city: "Kabirwala", province: "Multan", contact: "0300-1774770 / 0310-8760000" },
  { name: "Kamran Battery Center - Layyah", address: "Katchery Road, Near General Bus Stand, Layyah", city: "Layyah", province: "Multan", contact: "0334-6812030" },
  { name: "Sohail Anwar & Co - Sahiwal", address: "Railway Road, Sahiwal", city: "Sahiwal", province: "Multan", contact: "0300-0799867 / 0333-1022340" },
  { name: "Sami Battery Service - Fatehpur", address: "M M Road, Fateh Pur", city: "Fateh Pur", province: "Multan", contact: "0300-87622121" },
  { name: "Awami Corporation - Arif Wala", address: "Near General Bus Stand Pakpattan Road, Arif Wala", city: "Arifwala", province: "Multan", contact: "0300-6907423" },
  { name: "Iqbal Battery Service - Layyah", address: "General Bus Stand, Layyah", city: "Layyah", province: "Multan", contact: "0300-2850175" },
  { name: "New Rasheed Battery Service - Multan", address: "128 B, Vehari Chowk, General Bus Stand, Multan", city: "Multan", province: "Multan", contact: "0345-6949930" },
  { name: "Zayan Bajwa Battery Center - Rajan Pur", address: "Dera Ghazi Khan Road, Rajan Pur", city: "Rajan Pur", province: "Multan", contact: "0302-8762121" },
  { name: "Pakistan Battery Traders - Mian Channu", address: "Main Road, Mian Channu", city: "Mian Channu", province: "Multan", contact: "0300-8421599 / 0303-3631910" },
  { name: "Energy Source - Bahawalpur", address: "Multan Road, Bahawalpur", city: "Bahawalpur", province: "Multan", contact: "0323-7590342" },
  { name: "Madina Battery Service - Kamlia", address: "Iqbal Town. Faisalabad Road, Kamlia", city: "Kamlia", province: "Multan", contact: "0317-1690620" },
  { name: "Shoaib Traders - D.G Khan", address: "Schani Colony, Near Pull Piyary Wali, D.G Khan", city: "D.G Khan", province: "Multan", contact: "0300-5420000" },
  { name: "Talha Traders - Multan", address: "26-K, General Bus Stand, Vehari Chowk, Multan", city: "Multan", province: "Multan", contact: "0316-8583974" },
  { name: "M/S Dawn Battery Shop - Jacobabad", address: "Station Road, Jacobabad", city: "Jacobabad", province: "Sukkur", contact: "0333-7555888" },
  { name: "H M Marketing - Quetta", address: "Achakzai Market Near Satellite Town Block-3, Quetta", city: "Quetta", province: "Quetta", contact: "0333-7871780" },
  { name: "Sachal Batteries Centre - Sukkur", address: "Near City Marriage Hall, Race Course Road, Sukkur", city: "Sukkur", province: "Sukkur", contact: "0315-3117483 / 0332-1379640" },
  { name: "Subhanallah Battery Service - Sukkur", address: "New Bus Stand, Near Super Magsi CNG Station, Sukkur", city: "Sukkur", province: "Sukkur", contact: "0310/0302-3122994" },
  { name: "Sheikh Adnan General, Solar and Battery Shop - Bhiria Road", address: "Main Shahi Bazar, Bhiria Road", city: "Bhiria", province: "Sukkur", contact: "0300-2370303 / 0312-3268210" },
  { name: "Indus Battery Service - Khanpur Mahar", address: "Near Khan Auto Garrage, Main Road Khanpur Mahar", city: "Khanpur Mahar", province: "Sukkur", contact: "0301-3419821 / 0302-3155800" },
  { name: "Good Luck Electronics - Khairpur", address: "Phool Bagh Road, Near City Hospital, Khairpur", city: "Khairpur", province: "Sukkur", contact: "0301-3423527 / 0315-3491109" },
  { name: "Rehmat Auto Battery Service - Moro", address: "Main Road, Moro", city: "Moro", province: "Sukkur", contact: "0311-3523468 / 0306-3529827" },
  { name: "M/S Mumtaz Autos & Battery Service - Khairpur", address: "Katchery Road, Near Maryam Top, Khairpur", city: "Khairpur", province: "Sukkur", contact: "0300-3137901 / 0315-3137901" },
  { name: "Al-Madina Battery Service - Larkana", address: "Al Murtaza Shoping Center, Qaim Shah Bukhari Road, Larkana", city: "Larkana", province: "Sukkur", contact: "0333-7571286" },
  { name: "Madina Auto & Battery Service - Kashmore", address: "Railway Road, Kashmore", city: "Kashmore", province: "Sukkur", contact: "0333-7414297 / 0345-8812728" },
  { name: "M/S Chandio Electronics Store - Dadu", address: "Shop#1-2 Opposite Vocational School Fish Market Road, Dadu", city: "Dadu", province: "Sukkur", contact: "0315-9315931" },
  { name: "Madina Battery Service - Daharki", address: "Main G.T Road, Daharki, District Ghotki", city: "Daharki", province: "Sukkur", contact: "0302-2344758" },
  { name: "M/S E-Cool Center - Quetta", address: "Shop#1, Double Road, Zarghoon Town, Quetta", city: "Quetta", province: "Quetta", contact: "0336-2219326" },
  { name: "M/S Zaid Enterprises - Quetta", address: "Office#09, Gull's Inn Palaza, Ist Floor Angle Road, Off M.A Jinnah Road, Quetta", city: "Quetta", province: "Quetta", contact: "081-2821446" },
  {
    name: "Haji Bashir Ahmed Solar System Electric Shop - Naushero Feroze",
    address: "Padidan Road, Naushero Feroze",
    city: "Naushero Feroze",
    province: "Sukkur",
    contact: "0301-2314124 / 0333-7009142",
  },
  { name: "Akram Oil Traders - Chaman", address: "Shop No.2, Qandhari, Bazar, Killa Abdullah, Chaman", city: "Chaman", province: "Quetta", contact: "0345-8871701" },
  { name: "Yaseen Battery Zone - Quetta", address: "Circular Road, Quetta", city: "Quetta", province: "Quetta", contact: "0300-9387788" },
  { name: "Yasin Zai Enterprises - Quetta", address: "Mehmood Hotel, Near Circular Road Corner Ali Bhai Road, Quetta", city: "Quetta", province: "Quetta", contact: "0336-8168122" },
  { name: "New Muhammadi Battery Zone - Quetta", address: "Mir Ghai Khan Chowk Quetta", city: "Quetta", province: "Quetta", contact: "0344-4798621" },
  { name: "Khalid Battery Zone - Quetta", address: "Shop#1, Raisani Center Double Road, Quetta", city: "Quetta", province: "Quetta", contact: "0332-7824030" },
  { name: "Sarwar Battery Service - Ranipur", address: "Near Taj Petrol Pump, National Highway, Ranipur", city: "Ranipur", province: "Sukkur", contact: "0300-3137450" },
  { name: "Hafiz Oil Traders - Sukkur", address: "Shop No 12, Race Course Road, Sukkur", city: "Sukkur", province: "Sukkur", contact: "0311-3685553 / 0300-2575150" },
  { name: "YJS Enterprises - Larkana", address: "Solar & Batteries Market, Near Midtown Mall, Pakistani Chowk Larkana", city: "Larkana", province: "Sukkur", contact: "0333-7578814" },
  { name: "Jhoolay Lal Power Solutions - Sukkur", address: "Race Course Road, Sukkur", city: "Sukkur", province: "Sukkur", contact: "0305-3613014" },
  { name: "Al Madni Traders - Panjgur", address: "Al Madni Traders, Panjgur", city: "Panjgur", province: "Quetta", contact: "0310-3375840" },
  { name: "Wali Tractors And Battery Zone - Quetta", address: "Wali Tractors And Battery Zone, Quetta", city: "Quetta", province: "Quetta", contact: "0301-3832955" },
  { name: "Dawood Wali Autos - Sukkur", address: "Near Faisal Bank, Race Course Road, Sukkur", city: "Sukkur", province: "Sukkur", contact: "0304-8413509" },
  { name: "Al Madina Battery Service - Mirpur Mathelo", address: "Shop#90, Sindhu green City, Mirpur Mathelo", city: "Mirpur Mathelo", province: "Sukkur", contact: "0333-7576667" },
  { name: "Asad Battery Centre - Dera Murad Jamali", address: "Near City Police Station, Quetta Road, Dera Murad Jamali", city: "Dera Murad Jamali", province: "Quetta", contact: "0300-3244144" },
  { name: "Al Shahbaz Battery Center - Sukkur", address: "Race Course Road, Near City Hall, Sukkur", city: "Sukkur", province: "Sukkur", contact: "0321-3004378" },
  { name: "Ali Traders - Ghotki", address: "Ali Traders, Ghotki", city: "Ghotki", province: "Sukkur", contact: "0310-3863564 / 0333-2974470" },
  { name: "Sindh Battery Service - Larkana", address: "Qaim Shah Bukhari Road, Larkana", city: "Larkana", province: "Sukkur", contact: "0300-3244221 / 0332-3244221" },
  { name: "Chohan Traders - Hyderabad", address: "Shop#H.C.B 1673, Abdul Qayoom Road, Gari Khata, Hyderabad", city: "Hyderabad", province: "Hyderabad", contact: "0307-3109010 / 0333-3109010" },
  {
    name: "Abdul Wahid Battery Sales & Services - Hyderabad",
    address: "New Pul, Sabzi Mandi, Near Shalimar Coach Service, Hyderabad",
    city: "Hyderabad",
    province: "Hyderabad",
    contact: "0301/0334-2556215",
  },
  {
    name: "Mehran Battery Sales & Services - Mirpur Khas",
    address: "Shop#1, Mashallah Market, Jarwarishakh, Mirpur Khas",
    city: "Mir Pur Khas",
    province: "Hyderabad",
    contact: "0300-3639172 / 0317-3141300",
  },
  {
    name: "Pakistan Battery Sell & Services (EXID) - Tando Adam",
    address: "Birani Road, Near Sabzi Mandi, Tando Adam, District Sanghar.",
    city: "Tando Adam",
    province: "Hyderabad",
    contact: "0344-3536404 / 0343-3538100",
  },
  { name: "M/S Millat Motors andTractors - Nawab Shah", address: "Sanghar Road, Nawab Shah", city: "Nawab Shah", province: "Hyderabad", contact: "0300-3741344" },
  {
    name: "Adnan Battery Center - Tando Jan Muhammad",
    address: "Shop#3, Near Eid Gah, Jhado Road, Tando Jan Muhammad",
    city: "Tando Jan Muhammad",
    province: "Hyderabad",
    contact: "0304-5843226 / 0301-2891033",
  },
  { name: "Jadon Autos & Battery Service - Badin", address: "Press Club Road, Qazia Wah Pul, Badin", city: "Badin", province: "Hyderabad", contact: "0313-6513390" },
  { name: "Ghansham Das Battery Sale and Service - Umer Kot", address: "Khatak Market, Godam Road, Umer Kot", city: "Umer Kot", province: "Hyderabad", contact: "316-6695505" },
  {
    name: "Shahid Ali Battery Shop - Nawab Shah",
    address: "Main Qazi Ahmed Road, Near Al Haram Petrol Pump, Nawab Shah",
    city: "Nawab Shah",
    province: "Hyderabad",
    contact: "0306-3009727 / 0316-3205995",
  },
  { name: "Habib Battery Service - Khipro", address: "Near Bank Alhabib, Main Mirpurkhas Road, Khipro", city: "Khipro", province: "Hyderabad", contact: "0304-8413509" },
  { name: "MRP Traders - Hyderabad", address: "Shop#32-33 Mehran Commercial Market, Hyderabad", city: "Hyderabad", province: "Hyderabad", contact: "0321-2200677 / 0314-2221281" },
  {
    name: "M.Nadir Khan & M.Yaseen Khan Battery Sales & Sevices - Hyderabad",
    address: "Nasrullah Market, Near Breez Fish Point, Near Paracha Autos, Hala Naka, Hyderabad",
    city: "Hyderabad",
    province: "Hyderabad",
    contact: "0333-3558851 / 0333-2159993",
  },
  { name: "Bismillah Battery Service - Shahdadpur", address: "Hala Chowk, Shahdadpur", city: "Shahdadpur", province: "Hyderabad", contact: "0300-2259464" },
  { name: "Asad Battery Centre - Dera Murad Jamali", address: "Near City Police Station, Quetta Road, Dera Murad Jamali", city: "Dera Murad Jamali", province: "Quetta", contact: "0331-2920465" },
  { name: "Azaan Traders - Karachi", address: "Shop#5, Near Meezan Bank, Opp, Garden Police Chowki, Karachi", city: "Karachi", province: "Karachi", contact: "0333-7677673 / 0313-6232326" },
  { name: "Iman Traders - Karachi", address: "Ruquaiya Square Block 14, Federal B Area, Near Mehfooz Shermal, Karachi.", city: "Karachi", province: "Karachi", contact: "0333-2388490 / 0305-1250601" },
  { name: "Habib Battery Centre - Karachi", address: "Shop#5/2 U.P. More, Siddique Plaza, North Karachi", city: "Karachi", province: "Karachi", contact: "0300-2378967" },
  { name: "Siddiq Battery Traders - Karachi", address: "Shop#9, Amin Plaza, Garden West, Nishtar Road, Garden West, Karachi", city: "Karachi", province: "Karachi", contact: "0300-2052616" },
  { name: "GM Traders - Karachi", address: "Shop#1,2,3, Plot#3, Near Baghdadi Masjid, Martor Quarter, Karachi.", city: "Karachi", province: "Karachi", contact: "0314-2288107" },
  {
    name: "Zam Zam Batteries Traders - Karachi",
    address: "Shop#50, Defence Garden Appt Phase-1, Main Korangi Road, DHA Karachi.",
    city: "Karachi",
    province: "Karachi",
    contact: "0333-8266692 / 0333-8266690",
  },
  { name: "Mustafa Battery - Karachi", address: "Shop#64, Iqra City Phase II, Abul Isphani Road, Karachi", city: "Karachi", province: "Karachi", contact: "0312-1280919 / 0323-2046599" },
  { name: "Yasir Trading - Karachi", address: "Shop#4, Plot# FL-14, Block 11, Unique Complex Gulshan-e-Iqbal, Karachi", city: "Karachi", province: "Karachi", contact: "0304-2623794" },
  { name: "Rashid Traders - Karachi", address: "Shop#13-, A-1, Heights, Nishter Road Garden, Karachi", city: "Karachi", province: "Karachi", contact: "0300-2561392 / 0312-8734419" },
  { name: "Bangash Battery - Karachi", address: "Shop#9, Bismillah Market, Super Highway, Karachi", city: "Karachi", province: "Karachi", contact: "0311-2583999 / 0300-2290076" },
  { name: "Adnan Battery Service - Karachi", address: "Korangi Nasir Jump, Near Mughal-e-Azam Banquet, Karachi", city: "Karachi", province: "Karachi", contact: "0313-2029758 / 0306-8582990" },
  {
    name: "Super Technology Solutions - Karachi",
    address: "3-C, Main South Park Avenue, Phase-II, Ext DHA, Karachi South",
    city: "Karachi",
    province: "Karachi",
    contact: "0333-2188214 / 0312-3332117",
  },
  {
    name: "Sindh Battery Service - Karachi",
    address: "Shop No C -31, Sunley Arcade, Safoora Chowrangi ,Gulshan Town, Karachi East",
    city: "Karachi",
    province: "Karachi",
    contact: "0332-2286075 / 0336-2175200",
  },
  { name: "Hamza Battery Center - Karachi", address: "Opposite Noman Masjid, Main Lasbella Signal, Karachi", city: "Karachi", province: "Karachi", contact: "0314-2345532 / 0333-2493714" },
  { name: "Madina Battery Services - Karachi", address: "S-3/97, Opposite Elementry Girls School, Suadabad, Malir Town, Karachi", city: "Karachi", province: "Karachi", contact: "0313-2280006" },
  { name: "Asif Battery Service - Karachi", address: "Badar Chowk, Near PSO Petrol Pump, Orangi Town 4, Karachi", city: "Karachi", province: "Karachi", contact: "0319-3039615 / 0311-2552162" },
  { name: "Jahangir Battery Service - HUB", address: "Coast Guard Market Near Arslan Medical Centre, Main RCD Road, Hub", city: "HUB", province: "Karachi", contact: "0334-3547835 / 0301-2600032" },
  { name: "M. Salah & Sons - Karachi", address: "Shop#16, Sector 1/A, Metro Cinema Road, Korangi Town, Karachi", city: "Karachi", province: "Karachi", contact: "0312-1367979 / 0314-2001736" },
  {
    name: "Shamim Akhtar Battery Service - Karachi",
    address: "Shop#1/2, Plot C-554, Near Malir Bridge. Quaidabad Karachi",
    city: "Karachi",
    province: "Karachi",
    contact: "0321-3316771 / 0312-4912286",
  },
  { name: "Wasay Battery Services - Karachi", address: "Shop#8, Model Colony Abbasi Market, Malir Karachi", city: "Karachi", province: "Karachi", contact: "0333-2153353 / 0306-2807021" },
  { name: "Hammad Battery Service - Karachi", address: "Shop#9, Near Navel Flates. Agra Taj Colony, Karachi", city: "Karachi", province: "Karachi", contact: "0333-2228366" },
  { name: "Karachi Kings Batteries - Karachi", address: "Shop#1, Near Babar Kanta, Bhens Colony More, Karachi", city: "Karachi", province: "Karachi", contact: "0321-2461031 / 0315-2461031" },
  { name: "Darbar Battery Service - Karachi", address: "Shop#197, Garden Takuna Market, Nishtar Road, Karachi", city: "Karachi", province: "Karachi", contact: "0344-233091 / 0331-2600032" },
  { name: "Abdul Hadi Battery Traders - Karachi", address: "Shop No 02, Main Razzaqabad Bus Stop, Bin Qasim, Karachi", city: "Karachi", province: "Karachi", contact: "0337-3304392 / 0333-2159993" },
  { name: "Rehman Battery Service - Karachi", address: "Main Road Korangi Road,Near KMC Sports Complex, Korangi No.5, Karachi", city: "Karachi", province: "Karachi", contact: "0317-1287855" },
  {
    name: "Good Luck Battery Center - Karachi",
    address: "Shop#2, Tikona Market Traffic Chowki Back Side, Nishtar Road, Karachi",
    city: "Karachi",
    province: "Karachi",
    contact: "0336-2546020 / 0321-3626962",
  },
  { name: "Aitemad Battery Service - Karachi", address: "Plot#4/5, Boat Building Yard, Wharf Road, Fishry, Karachi", city: "Karachi", province: "Karachi", contact: "0313-2280006" },
  { name: "Atif Traders - Karachi", address: "Ruquaiya Square Block14, Federal B Area, Karachi", city: "Karachi", province: "Karachi", contact: "0319-3039615 / 0311-2552162" },
  {
    name: "Ghaznavi Battery & Electric Store - Karachi",
    address: "Shop No:4, Main Jinnah Square, Opposite Karachi Ice Cream, Malir Karachi",
    city: "Karachi",
    province: "Karachi",
    contact: "0334-3547835 / 0301-2600032",
  },
  { name: "Battery Lab - Karachi", address: "Korangi#5-1/2, Sector 43/B, Opposite Jumma Bazar Ground, Karachi", city: "Karachi", province: "Karachi", contact: "0312-1367979 / 0314-2001736" },
  { name: "Rahmat Auto Battery Services", address: "Main Road Moro Tahsil Moro Sindh Disst Naushahro Feroze", city: "Moro", province: "Sukkur", contact: "0306-3529827 / 0311-3523468 / 0323-3900155" },
  { name: "Ali and Company", address: "391-Sector D/3, Wapda Town, Lahore", city: "Lahore", province: "Lahore", contact: "0321-8262405 0337-4633900" },
];

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("dealerSearch");
  const provinceSelect = document.getElementById("provinceFilter");
  const dealerList = document.getElementById("dealerList");
  const dealerCount = document.getElementById("dealerCount");
  const dealerCountDisplay = document.getElementById("dealerCountDisplay");

  function renderDealers(data) {
    dealerList.innerHTML = "";
    dealerCount.innerText = data.length;
    if (dealerCountDisplay) dealerCountDisplay.innerText = data.length;

    if (data.length === 0) {
      dealerList.innerHTML = `
                <div class="p-10 text-center border-2 border-dashed border-gray-100">
                    <p class="text-gray-400 font-black uppercase text-xs tracking-widest">No dealers found in this region</p>
                </div>`;
      return;
    }

    data.forEach((dealer) => {
      const card = document.createElement("div");
      card.className = "dealer-card bg-white border-2 border-gray-200 p-5 rounded-lg hover:border-[#cc001b] hover:shadow-md transition-all group cursor-pointer";
      card.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                        <h4 class="text-zinc-900 font-bold uppercase tracking-wide text-sm mb-2 group-hover:text-[#cc001b] transition-colors">${dealer.name}</h4>
                        <p class="text-gray-600 text-xs font-medium leading-relaxed">${dealer.address}</p>
                    </div>
                    <span class="text-xs bg-gray-100 text-[#cc001b] px-3 py-1 rounded-full font-bold uppercase ml-2 whitespace-nowrap">${dealer.province}</span>
                </div>
                <div class="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <a href="tel:${dealer.contact}" class="text-zinc-900 text-xs font-bold uppercase tracking-wide hover:text-[#cc001b] transition-colors flex items-center gap-1">
                        <i class="fa-solid fa-phone text-[10px]"></i>
                        ${dealer.contact}
                    </a>
                    <span class="text-gray-300">|</span>
                    <button class="text-[#cc001b] text-xs font-semibold uppercase tracking-wide hover:underline">Get Directions</button>
                </div>
            `;
      dealerList.appendChild(card);

      // Add click handler to update map and scroll
      card.addEventListener("click", () => {
        updateMapLocation(dealer.address);
        scrollToSearchBar();
      });
    });
  }

  function filterDealers() {
    const term = searchInput.value.toLowerCase();
    const prov = provinceSelect.value;

    const filtered = dealers.filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(term) || d.address.toLowerCase().includes(term) || d.city.toLowerCase().includes(term) || d.province.toLowerCase().includes(term);
      const matchesProv = prov === "All" || d.province === prov;
      return matchesSearch && matchesProv;
    });

    renderDealers(filtered);
  }

  searchInput.addEventListener("input", filterDealers);
  provinceSelect.addEventListener("change", filterDealers);

  // Clear button and suggestions
  const dealerClear = document.getElementById("dealerClear");
  const suggestionsBox = document.getElementById("dealer-suggestions");

  function updateSuggestions(term) {
    term = (term || "").toLowerCase().trim();
    if (!term) {
      suggestionsBox.classList.add("hidden");
      return;
    }

    const matches = dealers
      .filter((d) => {
        return d.name.toLowerCase().includes(term) || d.address.toLowerCase().includes(term) || d.city.toLowerCase().includes(term) || d.province.toLowerCase().includes(term);
      })
      .slice(0, 8);

    if (matches.length === 0) {
      suggestionsBox.innerHTML = `<div class="p-3 text-gray-500 text-sm">No suggestions</div>`;
      suggestionsBox.classList.remove("hidden");
      return;
    }

    suggestionsBox.innerHTML = matches
      .map(
        (m) =>
          `<button type="button" class="w-full text-left px-4 py-2 hover:bg-gray-100 suggestion-item" data-value="${escapeHtml(
            m.name,
          )}"><div class="text-sm font-bold">${escapeHtml(m.name)}</div><div class="text-xs text-gray-500">${escapeHtml(m.city)} • ${escapeHtml(m.province)}</div></button>`,
      )
      .join("");

    suggestionsBox.classList.remove("hidden");
  }

  function escapeHtml(str) {
    return String(str).replace(/[&"'<>]/g, (s) => ({ "&": "&amp;", '"': "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" })[s]);
  }

  // Show/hide clear button
  function toggleClear() {
    if ((searchInput.value || "").trim()) {
      dealerClear.classList.remove("hidden");
    } else {
      dealerClear.classList.add("hidden");
    }
  }

  // Wire input to suggestions + clear button
  searchInput.addEventListener("input", function (e) {
    toggleClear();
    updateSuggestions(this.value);
  });

  dealerClear.addEventListener("click", function (e) {
    e.preventDefault();
    searchInput.value = "";
    toggleClear();
    suggestionsBox.classList.add("hidden");
    filterDealers();
    searchInput.focus();
  });

  // Delegate suggestion clicks
  suggestionsBox.addEventListener("click", function (e) {
    const btn = e.target.closest(".suggestion-item");
    if (!btn) return;
    const val = btn.getAttribute("data-value");
    if (val) {
      searchInput.value = val;
      toggleClear();
      suggestionsBox.classList.add("hidden");
      filterDealers();
    }
  });

  // Hide suggestions when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#dealer-suggestions") && !e.target.closest("#dealerSearch")) {
      suggestionsBox.classList.add("hidden");
    }
  });

  // Update map location function
  function updateMapLocation(address) {
    const mapIframe = document.getElementById("dealerMap");
    const encodedAddress = encodeURIComponent(address);
    mapIframe.src = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  }

  // Scroll to search bar function
  function scrollToSearchBar() {
    const searchSection = document.querySelector(".max-w-7xl");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Initial load
  renderDealers(dealers);
});
