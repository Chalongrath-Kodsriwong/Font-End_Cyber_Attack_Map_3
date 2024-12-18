import React, { useState, useEffect } from "react";
import "../components/css/CountryAttack.css";
import "../components/JS/CountryAttack_Fun.js"; // Import ไว้เพื่อให้ใช้ jQuery ฟังก์ชัน
import { setupCountryAttackAnimation } from "../components/JS/CountryAttack_Fun.js"; // เพิ่มฟังก์ชันที่ export
import axios from "axios";

// Map country names to image paths
const countryFlags = {
  "United States": "/flags/United States of America.png",
  Bulgaria: "/flags/bulgaria.png",
  China: "/flags/china.png",
  Germany: "/flags/germany.png",
  Netherlands: "/flags/netherlands.png",
  Russia: "/flags/russia.png",
  "United Kingdom": "/flags/unitedkingdom.png",
  Thailand: "/flags/Thailand.png",
  Singapore: "/flags/singapore.png",
  Belgium: "/flags/belgium.png",
  India: "/flags/india.png",
  Brazil: "/flags/brazil.png",
  "The Netherlands": "/flags/netherlands.png",
  Canada: "/flags/canada.png",
  France: "/flags/france.png",
  "South Korea": "/flags/southkorea.png",
  Vietnam: "/flags/vietnam.png",
  Ukraine: "/flags/ukraine.png",
  Japan: "/flags/japan.png",
  Taiwan: "/flags/taiwan.png",
  Czechia: "/flags/czech.png",
  "Hong Kong": "/flags/hongkong.png",
  Italy: "/flags/italy.png",
  Romania: "/flags/romania.png",
  Cyprus: "/flags/cyprus.png",
  Sweden: "/flags/sweden.png",
  Spain: "/flags/spain.png",
  Pakistan: "/flags/pakistan.png",
  Israel: "/flags/israel.png",
  Australia: "/flags/australia.png",
  Poland: "/flags/poland.png",
  Malaysia: "/flags/malaysia.png",
  "South Africa": "/flags/southafrica.png",
  Switzerland: "/flags/switzerland.png",
  Norway: "/flags/norway.png",
  Ireland: "/flags/ireland.png",
  "United Arab Emirates": "/flags/unitedarabemirates.png",
  Peru: "/flags/peru.png",
  Denmark: "/flags/denmark.png",
  Iran: "/flags/iran.png",
  Bangladesh: "/flags/bangladesh.png",
  Turkey: "/flags/turkey.png",
  Finland: "/flags/finland.png",
  Indonesia: "/flags/",
  "Republic of Lithuania": "/flags/",
  Latvia: "/flags/",
  Portugal: "/flags/",
  Ethiopia: "/flags/",
  Lithuania: "/flags/",
  Nigeria: "/flags/",
  Mexico: "/flags/",
  Kazakhstan: "/flags/",
  Argentina: "/flags/",
  Cambodia: "/flags/",
  Lebanon: "/flags/",
  Iraq: "/flags/",
  "Republic of Moldova": "/flags/",
  Uzbekistan: "/flags/",
  Georgia: "/flags/",
  Azerbaijan: "/flags/",
  Philippines: "/flags/",
  Tunisia: "/flags/",
  Türkiye: "/flags/",
  Austria: "/flags/",
  Colombia: "/flags/",
  Mozambique: "/flags/",
  Luxembourg: "/flags/",
  Chile: "/flags/",
  Seychelles: "/flags/",
  Algeria: "/flags/",
  "Sri Lanka": "/flags/",
  Greece: "/flags/",
  Afghanistan: "/flags/",
  Tanzania: "/flags/",
  Brunei: "/flags/",
  "Costa Rica": "/flags/",
  Morocco: "/flags/",
  Croatia: "/flags/",
  Senegal: "/flags/",
  Bolivia: "/flags/",
  Panama: "/flags/",
  "New Zealand": "/flags/",
  Mongolia: "/flags/",
  Uganda: "/flags/",
  Estonia: "/flags/",
  Hungary: "/flags/",
  "Bosnia and Herzegovina": "/flags/",
  Moldova: "/flags/",
  Belarus: "/flags/",
  Nicaragua: "/flags/",
  "El Salvador": "/flags/",
  Gambia: "/flags/",
  Mali: "/flags/",
  "Saudi Arabia": "/flags/",
  Macao: "/flags/",
  Slovakia: "/flags/",
  Zambia: "/flags/",
  Armenia: "/flags/",
  "Puerto Rico": "/flags/",
  Ecuador: "/flags/",
  "Dominican Republic": "/flags/",
  Bahrain: "/flags/",
  Egypt: "/flags/",
  Zimbabwe: "/flags/",
  Turkmenistan: "/flags/",
  Kenya: "/flags/",
  Liberia: "/flags/",
  Cameroon: "/flags/",
  Kuwait: "/flags/",
  Uruguay: "/flags/",
  Libya: "/flags/",
  Syria: "/flags/",
  Niger: "/flags/",
  "Trinidad and Tobago": "/flags/",
  "Hashemite Kingdom of Jordan	": "/flags/",
  Venezuela: "/flags/",
  Serbia: "/flags/",
  Iceland: "/flags/",
  Laos: "/flags/",
  Nepal: "/flags/",
  Slovenia: "/flags/",
  Albania: "/flags/",
  "Sierra Leone": "/flags/",
  "Turks and Caicos Islands": "/flags/",
  "Cabo Verde": "/flags/",
  Mauritius: "/flags/",
  Ghana: "/flags/",
  Eritrea: "/flags/",
  Jersey: "/flags/",
  "Ivory Coast": "/flags/",
  Maldives: "/flags/",
  Guadeloupe: "/flags/",
  Oman: "/flags/",
  Andorra: "/flags/",
  Kyrgyzstan: "/flags/",
  Mauritania: "/flags/",
  Rwanda: "/flags/",
  Jamaica: "/flags/",
  "Saint Martin": "/flags/",
  "Cayman Islands": "/flags/",
  Myanmar: "/flags/",
  Malta: "/flags/",
  Bahamas: "/flags/",
  Guatemala: "/flags/",
  Bermuda: "/flags/",
  "North Macedonia": "/flags/",
  Honduras: "/flags/",
  Belize: "/flags/",
  Cuba: "/flags/",
  Qatar: "/flags/",
  "Bonaire, Sint Eustatius, and Saba": "/flags/",
  Monaco: "/flags/",
  Aruba: "/flags/",
  Malawi: "/flags/",
  Barbados: "/flags/",
  "Equatorial Guinea": "/flags/",
  "British Virgin Islands": "/flags/",
  Angola: "/flags/",
  Bhutan: "/flags/",
  Jordan: "/flags/",
  Eswatini: "/flags/",
  "Wallis and Futuna": "/flags/",
  Montenegro: "/flags/",
  "Saint Pierre and Miquelon": "/flags/",
  Comoros: "/flags/",
  "Burkina Faso": "/flags/",
  Gibraltar: "/flags/",
  Kosovo: "/flags/",
  Palestine: "/flags/",
  Tajikistan: "/flags/",
  Somalia: "/flags/",
  Botswana: "/flags/",
  Namibia: "/flags/",
  Paraguay: "/flags/",
  Réunion: "/flags/",
  "Isle of Man": "/flags/",
  Madagascar: "/flags/",
  "New Caledonia": "/flags/",
  "St Kitts and Nevis": "/flags/",
  Suriname: "/flags/",
  

  Default: "/flags/default.png",
};

function Country_Attack() {
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/today-attacks");
      const data = response.data;

      const formattedCountries = data.map((item) => ({
        name: item.country,
        count: item.count,
        flag: countryFlags[item.country] || countryFlags["Default"],
      }));

      setCountries(formattedCountries);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    fetchCountries();

    const intervalId = setInterval(() => {
      fetchCountries();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setupCountryAttackAnimation(); // เรียกใช้ฟังก์ชันที่ import มา
  }, []);

  return (
    <>
      <div className="table-container">
        <strong>TOP TARGETED COUNTRIES</strong>
        <table className="country-table">
          <thead>
            <tr>
              <th>NO</th>
              <th>COUNTRY</th>
              <th>COUNT ATTACK</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={country.flag}
                    alt={`${country.name} Flag`}
                    onError={(e) => (e.target.src = "/flags/default.png")}
                  />
                  {country.name}
                </td>
                <td className="Count">{country.count.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn_hideShow">
        <p className="TextCountry">CountryAttacker</p>
        <p className="Arrow3">▼</p>
      </div>
    </>
  );
}

export default Country_Attack;
