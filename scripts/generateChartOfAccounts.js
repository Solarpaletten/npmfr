// generateChartOfAccounts.js
const fs = require('fs');

const accounts = [
 // Class 1 - Долгосрочные активы
 { code: "1", name: "ILGALAIKIS TURTAS", type: "ASSET", parent: null },
 
 // 11 - Нематериальные активы
 { code: "11", name: "Nematerialusis turtas", type: "ASSET", parent: "1" },
 { code: "111", name: "Plėtros darbai", type: "ASSET", parent: "11" },
 { code: "1110", name: "Plėtros darbų atlikimo savikaina", type: "ASSET", parent: "111" },
 { code: "1118", name: "Plėtros darbų vertės amortizacija", type: "ASSET", parent: "111" },
 { code: "1119", name: "Plėtros darbų vertės sumažėjimas", type: "ASSET", parent: "111" },
 
 { code: "112", name: "Prestižas", type: "ASSET", parent: "11" },
 { code: "1120", name: "Prestižo įsigijimo savikaina", type: "ASSET", parent: "112" },
 { code: "1128", name: "Prestižo vertės amortizacija", type: "ASSET", parent: "112" },
 { code: "1129", name: "Prestižo vertės sumažėjimas", type: "ASSET", parent: "112" },
 
 { code: "113", name: "Programinė įranga", type: "ASSET", parent: "11" },
 { code: "1130", name: "Programinės įrangos įsigijimo savikaina", type: "ASSET", parent: "113" },
 { code: "1138", name: "Programinės įrangos vertės amortizacija", type: "ASSET", parent: "113" },
 { code: "1139", name: "Programinės įrangos vertės sumažėjimas", type: "ASSET", parent: "113" },
 
 { code: "114", name: "Koncesijos, patentai, licencijos", type: "ASSET", parent: "11" },
 { code: "1140", name: "Koncesijų, patentų, licencijų įsigijimo savikaina", type: "ASSET", parent: "114" },
 { code: "1148", name: "Koncesijų, patentų, licencijų amortizacija", type: "ASSET", parent: "114" },
 { code: "1149", name: "Koncesijų, patentų, licencijų vertės sumažėjimas", type: "ASSET", parent: "114" },
 
 { code: "115", name: "Kitas nematerialusis turtas", type: "ASSET", parent: "11" },
 { code: "1150", name: "Kito nematerialiojo turto įsigijimo savikaina", type: "ASSET", parent: "115" },
 { code: "1158", name: "Kito nematerialiojo turto vertės amortizacija", type: "ASSET", parent: "115" },
 { code: "1159", name: "Kito nematerialiojo turto vertės sumažėjimas", type: "ASSET", parent: "115" },
 
 { code: "116", name: "Sumokėti avansai už nematerialųjį turtą", type: "ASSET", parent: "11" },
 
 // 12 - Материальные активы
 { code: "12", name: "Materialusis turtas", type: "ASSET", parent: "1" },
 { code: "120", name: "Žemė", type: "ASSET", parent: "12" },
 { code: "1200", name: "Žemės įsigijimo savikaina", type: "ASSET", parent: "120" },
 { code: "1201", name: "Žemės vertės pokytis dėl perkainojimo", type: "ASSET", parent: "120" },
 { code: "1209", name: "Žemės vertės sumažėjimas", type: "ASSET", parent: "120" },
 
 { code: "121", name: "Pastatai ir statiniai", type: "ASSET", parent: "12" },
 { code: "1210", name: "Pastatų ir statinių įsigijimo savikaina", type: "ASSET", parent: "121" },
 { code: "1211", name: "Pastatų vertės pokytis dėl perkainojimo", type: "ASSET", parent: "121" },
 { code: "1212", name: "Ruošiami naudoti pastatai ir statiniai", type: "ASSET", parent: "121" },
 { code: "1217", name: "Pastatų įsigijimo savikainos nusidėvėjimas", type: "ASSET", parent: "121" },
 { code: "1218", name: "Pastatų vertės pokyčio nusidėvėjimas", type: "ASSET", parent: "121" },
 { code: "1219", name: "Pastatų vertės sumažėjimas", type: "ASSET", parent: "121" },

 // Добавьте остальные счета класса 1 здесь...
];

// Создание CSV файла
const generateCSV = (accounts) => {
 const header = 'code,name,account_type,parent_code,is_active\n';
 const rows = accounts.map(account => {
   return `${account.code},"${account.name}",${account.type},${account.parent || ''},true`;
 }).join('\n');
 
 return header + rows;
};

// Сохранение в файл
try {
 const csv = generateCSV(accounts);
 fs.writeFileSync('chart_of_accounts_class1.csv', csv, 'utf8');
 console.log('CSV file has been successfully generated!');
} catch (error) {
 console.error('Error generating CSV file:', error);
}