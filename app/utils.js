/**
 * Created by ikebal on 21.11.15.
 */
var PDFDocument = require('pdfkit');
var fs = require('fs');

var left_side_captions = {
  company_name: 'Firmanavn',
  stand_name: 'Navn på stand',
  contact_person: 'Kontaktperson',
  address: 'Adresse',
  zip_code: 'Postnummer',
  phone: 'Telefon',
  email: 'Email'
};

var right_side_captions = {
  organization_number: 'Organisasjonsnummer',
  city: 'Poststed',
  cellphone: 'Mobil',
  website: 'Webside'
};

var bottom_captions = {
  billing_address: 'Fakturaadresse',
  stand_until_21: 'Standard stand (telt, åpent til 21:00)',
  opening_hours_to_24: 'Åpningstid til 24:00 (+ 5.000,-)',
  license_open_until_21: 'Bevilling åpent til 21:00 (+ 10.000,-)',
  license_open_until_24: 'Bevilling åpent til 24:00 (+ 27.000,-)',
  extra_space: 'Ekstra uteareal (kvm)',
  additional_requirements: 'Vi skal tilby følgend',
  proposal: 'Gladmatrett (forslag)',
  note: 'Kommentar'
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
      .font('Helvetica')
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
    var left_value_x = 180;
    var width = 100;
    var key;

    console.log('[ x; y ]', doc.x, doc.y);

    doc.moveDown().fontSize(12);
    var start_right_y = doc.y;

    for (key in left_side_captions) {
      if (left_side_captions.hasOwnProperty(key)) {
        doc
          .fontSize(12)
          .text(left_side_captions[key] + ':', left_caption_x, doc.y, { width: width, align: 'right' })
          .moveUp()
          .text(data[key], left_value_x, doc.y, { width: width, align: 'left' })
          .moveDown();
      }
    }

    var finish_left_y = doc.y;
    doc.y = start_right_y;
    width = 125;
    var right_caption_x = 300;
    var right_value_x = right_caption_x + width + 6;
    var lines = 1;

    for (key in right_side_captions) {
      if (right_side_captions.hasOwnProperty(key)) {
        lines = key === 'organization_number' ? 7 : 1;

        doc
          .fontSize(12)
          .text(right_side_captions[key] + ':', right_caption_x, doc.y, { width: width, align: 'right' })
          .moveUp(1)
          .text(data[key], right_value_x, doc.y, { width: width, align: 'left' })
          .moveDown(lines);
      }
    }

    doc.x = left_caption_x;
    doc.y = finish_left_y;
    width = 100;

    for (key in bottom_captions) {
      if (bottom_captions.hasOwnProperty(key) && data[key] !== undefined) {
        doc
          .fontSize(12)
          .text(bottom_captions[key] + ':', left_caption_x, doc.y, { width: width, align: 'right' })
          .moveUp()
          .text(data[key], left_value_x, doc.y, { width: 400, align: 'left' })
          .moveDown();
      }
    }


    doc.addPage();

    var text = 'Lorem ipsum dolor sit amet, no duo alii consulatu. Facer insolens constituto an vim, ei nec vidit dolore instructior. Stet corrumpit usu te. Illum sapientem an pro, ius tale solum ad. Cu etiam inani partiendo sit, sed vero magna no, in mel omnis facete. Mel oportere similique ne, epicuri fabellas repudiandae at pri. In facer quidam voluptua qui, ex antiopam deseruisse pro. Percipit accommodare cum eu. Graeco suavitate nec no, ne ridens voluptatibus mei. Nam ex bonorum ornatus, ludus scripta vix ne. Eu quando consul dictas vix. Affert quodsi alienum per et. Vix eu atqui scriptorem, ipsum harum eam ex. Usu cu magna dicam. Mei in denique suavitate deseruisse, et eum alterum praesent, his te modo torquatos necessitatibus. Eu stet causae contentiones est. Cum at nonumes insolens, mel vitae omittantur ea, sea et idque expetenda. Sea ei blandit ullamcorper. Laoreet democritum vis no. No mei feugiat ceteros voluptua. Mel in tation dicunt appellantur. Cu eam eius adipisci adolescens.';
    doc.text(text).text(text).text(text);

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
  billing_address: '879456, Village,via Country, 42, John Farmer',
  zip_code: '098547',
  city: 'Planet Earth',
  phone: '+39564875215',
  cellphone: '+393296547812',
  website: 'bullcentury.com',
  extra_space: '',
  addition: 'Transportation needed',
  proposal: 'Provided drinking water',
  note: 'Ciao ragazzi!'
};


utils.generatePDF(model, function (err, result) {});*/
