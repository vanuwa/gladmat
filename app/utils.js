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
  tax_id: 'Organisasjonsnummer',
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
      .image('public/images/gladmat_logo_green_600px.png', 500, 40, { width: 60 })
      .font('Helvetica')
      .fillColor('#666666');

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
        lines = key === 'tax_id' ? 7 : 1;

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

    doc
      .font('Helvetica')
      .fillColor('#666666')
      .fontSize(14)
      .text('Gladmat AS, post@gladmat.no, faks: 51 87 40 71', { align: 'center' })
      .fontSize(20)
      .text( "KONTRAKTS BETINGELSER", { align: 'center'} );

    doc
      .moveDown()
      .fontSize(14)
      .text('1. Bestilling', { indent: 30 })
      .fontSize(12)
      .text('Vi takker for interessen for GLADMAT, og i dette dokumentet finner du/dere de samlede betingelser for å være utstiller i 2016. Gladmat er avhengig av forutberegnelighet i god tid før arrangementet begynner, og vilkårene i kontrakten bærer preg av dette. Alt dette for at vi skal kunne levere en best mulig tjeneste til deg og dine kunder.', {
        align: 'justify',
        indent: 30
      })
      .text('Kontrakten er bindende.', { align: 'justify' })
      .text('Kontrakten er ikke gyldig før denne foreligger i utfylt og undertegnet stand.', { align: 'justify', indent: 30 })
      .text('Utstiller som trekker sin bestilling etter 28.2.2016 må betale en kanselleringsavgift på kroner 1500.-', { align: 'justify', indent: 30 })
      .text('Ved kansellering mellom 1. april og 31. mai må 50 % av standleien betales.', { align: 'justify', indent: 30 })
      .text('Ved kansellering etter 1. juni må 100 % av standleien betales.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('2. Betalingsbetingelser', { indent: 30 })
        .fontSize(12)
        .text('Halvparten av beløpet faktureres ved bestilling (med forfall etter 15 dager), og resten faktureres med betalingsfrist 1. april. Ved bestilling etter 1. april, faktureres hele beløpet samtidig. Garanti for avtalt standareal bortfaller dersom ikke faktura blir betalt i tide. Ved for sen betaling vil kunden bli belastet med 1,5 % rente pr. påbegynt måned. Det gis ikke adgang til stand dersom ikke full standleie er betalt innen festivalstart.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('3. Fremleie', { indent: 30 })
        .fontSize(12)
        .text('Fremleie av stand er ikke tillatt.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('4. Avlysning', { indent: 30 })
        .fontSize(12)
        .text('Arrangøren forbeholder seg retten til å kunne avlyse arrangementet.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('5.', { indent: 30 })
        .fontSize(12)
        .text('Utstiller er ansvarlig for skader som påføres personer, bygninger, innredninger, anlegg og underlag/dekke. Instrukser og anvisninger fra myndigheter og arrangør må følges nøye.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('6.', { indent: 30 })
        .fontSize(12)
        .text('Utstiller må ha alle godkjennelser fra Mattilsynet når det gjelder tilvirkning av mat før og under arrangementet.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('7.', { indent: 30 })
        .fontSize(12)
        .text('Utstiller må selv dekke nødvendig forsikring av eget utstyr.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('8.', { indent: 30 })
        .fontSize(12)
        .text('Utstiller må selv sørge for transport, montering og demontering, pakking og bortkjøring av sine varer og utstyr innen tidsrom gitt av arrangør.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('9.', { indent: 30 })
        .fontSize(12)
        .text('Når standen demonteres skal området og teltet tilbakeleveres rengjort og fri for dekorasjoner, spiker, fundamenter etc. i tilfelle forsømmelser, forbeholder arrangøren seg rett til å foreta det nødvendige opprydningsarbeidet for kundens regning. Skader, mangel på renhold av telt medfører ekstra kostnader som faktureres utstiller (standen gjennomgås sammen med utstiller før avreise).', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('10.', { indent: 30 })
        .fontSize(12)
        .text('Dersom kommunen pålegger ekstra rengjøring av dekke på standen, vil utstiller bli direkte belastet.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('11.', { indent: 30 })
        .fontSize(12)
        .text('Strøm, ekstra vann og håndvask (kun håndvask er obligatorisk) bestilles av den enkelte på eget skjema.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('12.', { indent: 30 })
        .fontSize(12)
        .text('Foruten gjelder politivedtektene m.h.t støy og orden. Musikk med forsterket lyd tidsbegrenses fra 19-23. Arrangør forbeholder seg retten til å stenge stander som ikke følger retningslinjer og regler gitt av arrangør el. off. myndigheter.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('13.', { indent: 30 })
        .fontSize(12)
        .text('Utstiller må forholde seg til type konsept og serveringstilbud innmeldt til arrangør, og retningslinjer i forhold til dette. Alle utstillere er pliktig å tilby småretter/smakebiter med maks pris kr. 30,-. Arrangør forbeholder seg retten til å stenge stander som ikke følger innmeldt konsept, retningslinjer og regler gitt av arrangør el. off. myndigheter.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('14.', { indent: 30 })
        .fontSize(12)
        .text('Utstiller plikter å oppgi omsetning i etterkant av festivalen.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('15.', { indent: 30 })
        .fontSize(12)
        .text('Utstiller som blir innvilget skjenkerett plikter til å innfri krav fra skjenkemyndighetene og politi i forhold til kunnskapsprøve og vakthold.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('16.', { indent: 30 })
        .fontSize(12)
        .text('Denne kontrakt og vedlegg har forrang foran alt annet hvor ikke GLADMAT skriftlig har fraveket dette.', { align: 'justify', indent: 30 });

    doc
        .moveDown()
        .fontSize(14)
        .text('17.', { indent: 30 })
        .fontSize(12)
        .text('Ved tvister partene selv ikke klarer å løse ved forhandlinger, vedtas Stavanger Byrett som rett verneting.', { align: 'justify', indent: 30 });




    doc.end();

    callback(null, { filename: filename, path: file_path } );
  }
};

module.exports = utils;

/*var model = { company_name: 'Bullcentury',
  tax_id: '1',
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
