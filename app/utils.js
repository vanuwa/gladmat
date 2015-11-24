/**
 * Created by ikebal on 21.11.15.
 */
var PDFDocument = require('pdfkit');
var fs = require('fs');

var utils = {
  generatePDF: function (data, callback) {
    var filename = data.contact_person.replace(/ /g, '_') + '_' + new Date().getTime() + '.pdf';
    var file_path = 'public/files/' + filename;
    var doc = new PDFDocument();
    var file = fs.createWriteStream(file_path);

    doc.pipe(file);

    doc
      .image('public/images/gladmat_logo_green_600px.png', 300, 10, { width: 40 })
      .font('Helvetica')
      .fillColor('#666666');

    doc
      .font('Helvetica')
      .fontSize(14)
      .text( "UTSTILLERSØKNAD - GLADMAT 2016 - 20.-23. JULI 2016", { align: 'center'} );

    var delta = 40;
    var field_width = 300;
    var x = doc.x + delta;
    var offset_x = 300 + delta;

    var caption_color = '#666';
    var text_color = '#333';
    var caption_font_size = 12;
    var text_font_size = 10;


    doc
      .moveDown()
      .fontSize(caption_font_size)

      .text('Firma', x, doc.y, { width: field_width })
      .moveUp()
      .text('Organisasjonsnummer', offset_x, doc.y, { width: field_width })

      .fillColor(text_color).fontSize(text_font_size)
      .text(data['company_name'], x, doc.y, { width: field_width,  align: 'left' })
      .moveUp()
      .text(data['tax_id'], offset_x, doc.y, { width: field_width });


    doc
      .moveDown()
      .fillColor(caption_color).fontSize(caption_font_size)
      .text('Navn på stand', x, doc.y, { width: field_width })

      .fillColor(text_color).fontSize(text_font_size)
      .text(data['stand_name'], { width: field_width });


    doc
      .moveDown()
      .fillColor(caption_color).fontSize(caption_font_size)
      .text('Kontaktperson', { width: field_width })

      .fillColor(text_color).fontSize(text_font_size)
      .text(data['contact_person'], { width: field_width });

    doc
      .moveDown()
      .fillColor(caption_color).fontSize(caption_font_size)
      .text('Adresse', { width: field_width })

      .fillColor(text_color).fontSize(text_font_size)
      .text(data['address'], { width: field_width });

    doc
      .moveDown()
      .fillColor(caption_color).fontSize(caption_font_size)
      .text('Postnummer', x, doc.y, { width: field_width })
      .moveUp()
      .text('Poststed', offset_x, doc.y, { width: field_width })

      .fillColor(text_color).fontSize(text_font_size)
      .text(data['zip_code'], x, doc.y, { width: field_width })
      .moveUp()
      .text(data['city'], offset_x, doc.y, { width: field_width });

    doc
      .moveDown()
      .fillColor(caption_color).fontSize(caption_font_size)
      .text('Telefon', x, doc.y, { width: field_width })
      .moveUp()
      .text('Mobil', offset_x, doc.y, { width: field_width })

      .fillColor(text_color).fontSize(text_font_size)
      .text(data['phone'], x, doc.y, { width: field_width })
      .moveUp()
      .text(data['cellphone'], offset_x, doc.y, { width: field_width });

    doc
      .moveDown()
      .fillColor(caption_color).fontSize(caption_font_size)
      .text('Email', x, doc.y, { width: field_width })
      .moveUp()
      .text('Webside', offset_x, doc.y, { width: field_width })

      .fillColor(text_color).fontSize(text_font_size)
      .text(data['email'], x, doc.y, { width: field_width })
      .moveUp()
      .text(data['website'], offset_x, doc.y, { width: field_width });

    doc
      .moveDown()
      .fillColor(caption_color).fontSize(caption_font_size)
      .text('Fakturaadresse', x, doc.y, { width: field_width })

      .fillColor(text_color).fontSize(text_font_size)
      .text(data['billing_address'], x, doc.y, { width: field_width });


    /* SECOND SECTION  */

    var value = data['stand_until_21'];
    value = value === 'custom' ? 'Annen str. ' + data['stand_until_21_custom'] + ' kvm.' : value ;

    doc
      .moveDown(2)
      .fillColor(caption_color).fontSize(caption_font_size)
      .text('Vi bekrefter søknad av følgende standard stand (telt, åpent til 21:00)', x, doc.y, { width: field_width })

      .fillColor(text_color).fontSize(text_font_size)
      .text(value, x, doc.y, { width: field_width });


    value = data['wagon'];
    if (value !== 'no') {
      value = value === 'custom' ? 'Annen str. vogn.' + data['wagon_custom'] + ' kvm.' : 'Vogn. Maks bredde/lengde 9 x 3 meter kr. 13.800,-';
      doc
        .moveDown()
        .fillColor(caption_color).fontSize(caption_font_size)
        .text(value, x, doc.y, { width: field_width });
    }


    if (data['opening_hours_to_24'] === 'on') {
      doc
        .moveDown()
        .fillColor(caption_color).fontSize(caption_font_size)
        .text('Åpningstid til 24:00 + kr. 5.000,-', x, doc.y, { width: field_width });
    }


    if (data['license_open_until_21'] === 'on') {
      doc
        .moveDown()
        .fillColor(caption_color).fontSize(caption_font_size)
        .text('Bevilling åpent til 21:00 + kr. 10.000,-', x, doc.y, { width: field_width });
    }


    if (data['license_open_until_24'] === 'on') {
      doc
        .moveDown()
        .fillColor(caption_color).fontSize(caption_font_size)
        .text('Bevilling åpent til 24:00 + kr. 27.000,-', x, doc.y, { width: field_width });
    }

    if (data['extra_space']) {
      doc
        .moveDown()
        .fillColor(caption_color).fontSize(caption_font_size)
        .text('Ekstra utearel kr. 470,- pr. kvm. ' + data['extra_space'] + ' kvm.', x, doc.y, { width: field_width });
    }


    value = data['proposal'];
    if (value) {
      doc
        .moveDown()
        .fillColor(caption_color).fontSize(caption_font_size)
        .text('Gladmatrett (forslag)', x, doc.y, { width: field_width })

        .fillColor(text_color).fontSize(text_font_size)
        .text(value, x, doc.y, { width: field_width });
    }


    value = data['note'];
    if (value) {
      doc
        .moveDown()
        .fillColor(caption_color).fontSize(caption_font_size)
        .text('Kommentar', x, doc.y, { width: field_width })

        .fillColor(text_color).fontSize(text_font_size)
        .text(value, x, doc.y, { width: field_width });
    }

    /* ====================================== */


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
      .fontSize(text_font_size)
      .text('1. Bestilling')
      .text('Vi takker for interessen for GLADMAT, og i dette dokumentet finner du/dere de samlede betingelser for å være utstiller i 2016. Gladmat er avhengig av forutberegnelighet i god tid før arrangementet begynner, og vilkårene i kontrakten bærer preg av dette. Alt dette for at vi skal kunne levere en best mulig tjeneste til deg og dine kunder.', {
        align: 'justify'
      })
      .text('Kontrakten er bindende.', { align: 'justify' })
      .text('Kontrakten er ikke gyldig før denne foreligger i utfylt og undertegnet stand.', { align: 'justify' })
      .text('Utstiller som trekker sin bestilling etter 28.2.2016 må betale en kanselleringsavgift på kroner 1500.-', { align: 'justify' })
      .text('Ved kansellering mellom 1. april og 31. mai må 50 % av standleien betales.', { align: 'justify' })
      .text('Ved kansellering etter 1. juni må 100 % av standleien betales.', { align: 'justify' });

    doc
        .moveDown()
        .text('2. Betalingsbetingelser')
        .text('Halvparten av beløpet faktureres ved bestilling (med forfall etter 15 dager), og resten faktureres med betalingsfrist 1. april. Ved bestilling etter 1. april, faktureres hele beløpet samtidig. Garanti for avtalt standareal bortfaller dersom ikke faktura blir betalt i tide. Ved for sen betaling vil kunden bli belastet med 1,5 % rente pr. påbegynt måned. Det gis ikke adgang til stand dersom ikke full standleie er betalt innen festivalstart.', { align: 'justify' });

    doc
        .moveDown()
        .text('3. Fremleie')
        .text('Fremleie av stand er ikke tillatt.', { align: 'justify' });

    doc
        .moveDown()
        .text('4. Avlysning')
        .text('Arrangøren forbeholder seg retten til å kunne avlyse arrangementet.', { align: 'justify' });

    doc
        .moveDown()
        .text('5. Utstiller er ansvarlig for skader som påføres personer, bygninger, innredninger, anlegg og underlag/dekke. Instrukser og anvisninger fra myndigheter og arrangør må følges nøye.', { align: 'justify' });

    doc
        .moveDown()
        .text('6. Utstiller må ha alle godkjennelser fra Mattilsynet når det gjelder tilvirkning av mat før og under arrangementet.', { align: 'justify' });

    doc
        .moveDown()
        .text('7. Utstiller må selv dekke nødvendig forsikring av eget utstyr.', { align: 'justify' });

    doc
        .moveDown()
        .text('8. Utstiller må selv sørge for transport, montering og demontering, pakking og bortkjøring av sine varer og utstyr innen tidsrom gitt av arrangør.', { align: 'justify' });

    doc
        .moveDown()
        .text('9. Når standen demonteres skal området og teltet tilbakeleveres rengjort og fri for dekorasjoner, spiker, fundamenter etc. i tilfelle forsømmelser, forbeholder arrangøren seg rett til å foreta det nødvendige opprydningsarbeidet for kundens regning. Skader, mangel på renhold av telt medfører ekstra kostnader som faktureres utstiller (standen gjennomgås sammen med utstiller før avreise).', { align: 'justify' });

    doc
        .moveDown()
        .text('10. Dersom kommunen pålegger ekstra rengjøring av dekke på standen, vil utstiller bli direkte belastet.', { align: 'justify' });

    doc
        .moveDown()
        .text('11. Strøm, ekstra vann og håndvask (kun håndvask er obligatorisk) bestilles av den enkelte på eget skjema.', { align: 'justify' });

    doc
        .moveDown()
        .text('12. Foruten gjelder politivedtektene m.h.t støy og orden. Musikk med forsterket lyd tidsbegrenses fra 19-23. Arrangør forbeholder seg retten til å stenge stander som ikke følger retningslinjer og regler gitt av arrangør el. off. myndigheter.', { align: 'justify' });

    doc
        .moveDown()
        .text('13. Utstiller må forholde seg til type konsept og serveringstilbud innmeldt til arrangør, og retningslinjer i forhold til dette. Alle utstillere er pliktig å tilby småretter/smakebiter med maks pris kr. 30,-. Arrangør forbeholder seg retten til å stenge stander som ikke følger innmeldt konsept, retningslinjer og regler gitt av arrangør el. off. myndigheter.', { align: 'justify' });

    doc
        .moveDown()
        .text('14. Utstiller plikter å oppgi omsetning i etterkant av festivalen.', { align: 'justify' });

    doc
        .moveDown()
        .text('15. Utstiller som blir innvilget skjenkerett plikter til å innfri krav fra skjenkemyndighetene og politi i forhold til kunnskapsprøve og vakthold.', { align: 'justify' });

    doc
        .moveDown()
        .text('16. Denne kontrakt og vedlegg har forrang foran alt annet hvor ikke GLADMAT skriftlig har fraveket dette.', { align: 'justify' });

    doc
        .moveDown()
        .text('17. Ved tvister partene selv ikke klarer å løse ved forhandlinger, vedtas Stavanger Byrett som rett verneting.', { align: 'justify' });


    /* ========================= */


    doc
      .moveDown(3)
      .text('X', { continued: true, stroke: true })
      .text('   Jeg har lest og godtatt kontrakstbetingelsene', { width: field_width, stroke: true, characterSpacing: 2 })
      .moveUp(1)

      .strokeColor('#666')
      .rect(doc.x-3, doc.y-4, 14, 14).stroke();


    doc.end();

    callback(null, { filename: filename, path: file_path } );
  }
};

module.exports = utils;

/*var model = { company_name: 'Avokado Art',
    tax_id: '111111',
    email: 'contact@bc.com',
    contact_person: 'Bill Shon',
    stand_name: 'Bullcentury',
    address: 'via Country, 1, Avokado street',
    billing_address: 'via Country, 1, Avokado street, 42',
    zip_code: '098547',
    city: 'Village',
    phone: '+39564875215',
    cellphone: '+393296547812',
    website: 'http://avokado.com',
    stand_until_21: 'custom',
    stand_until_21_custom: '473463',
    opening_hours_to_24: 'on',
    license_open_until_21: '',
    license_open_until_24: 'on',
    wagon: 'no',
    extra_space: '3284673',
    addition: '1432432',
    proposal: 'Additional transportation needed. And some markers on the area. Extra space for garbage.',
    note: 'Ciao ragazzi!'
};


utils.generatePDF(model, function (err, result) {});*/
