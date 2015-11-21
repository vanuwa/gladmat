/**
 * Created by ikebal on 21.11.15.
 */
var PDFDocument = require('pdfkit');
var fs = require('fs');

var caption_for = {
  company_name: 'Firmanavn',
  stand_name: 'Navn på stand',
  contact_person: 'Kontaktperson',
  address: 'Adresse',
  organization_number: 'Organisasjonsnummer',
  zip_code: 'Postnummer',
  phone: 'Telefon',
  email: 'Email',
  city: 'Poststed',
  cellphone: 'Mobil',
  website: 'Webside',
  billing_address: 'Fakturaadresse'
};

var utils = {
  generatePDF: function (data, callback) {
    var filename = data.contact_person.replace(/ /g, '_') + '_' + new Date().getTime() + '.pdf';
    var file_path = 'public/files/' + filename;
    var doc = new PDFDocument();
    var file = fs.createWriteStream(file_path);

    doc.pipe(file);

    doc
      .image('public/images/gladmat_logo_green_600px.png', 500, 40, { width: 60 });

    doc
      .fontSize(24)
      .text( "Gladmat 2016", { align: 'center'} );

    doc
      .fontSize(18)
      .text('Vågen Stavanger 20. – 23. juli 2016', { align: 'center' });

    doc
      .moveDown()
      .fontSize(14)
      .text('KONTRAKT', { align: 'center' });


    /*doc
      .moveDown()
      .fontSize(14)
      .text(JSON.stringify(data));*/

    var left_caption_x = doc.x;
    var left_value_x = 220;
    var width = 130;

    console.log('[ x; y ]', doc.x, doc.y);

    doc.moveDown().fontSize(12);

    for (var key in caption_for) {
      if (caption_for.hasOwnProperty(key)) {
        doc
          .fontSize(12)
          .text(caption_for[key] + ':', left_caption_x, doc.y, { width: width, align: 'right' })
          .moveUp()
          .text(data[key], left_value_x, doc.y, { width: width, align: 'left' })
          .moveDown();
      }
    }

    doc.end();

    callback(null, { filename: filename, path: file_path } );
  }
};

module.exports = utils;

/*var model = { company_name: 'Bullcentury',
  organization_number: '1',
  email: 'contact@bc.com',
  contact_person: 'Bill Shon',
  stand_name: 'Bullcentury',
  address: 'via Country, 42',
  billing_address: '',
  zip_code: '098547',
  city: 'Planet Earth',
  phone: '+39564875215',
  cellphone: '+393296547812',
  website: 'bullcentury.com',
  extra_space: '',
  addition: '',
  proposal: '',
  note: 'Ciao ragazzi!'
};


utils.generatePDF(model, function (err, result) {});*/
