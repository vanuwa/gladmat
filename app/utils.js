/**
 * Created by ikebal on 21.11.15.
 */
var PDFDocument = require('pdfkit');
var fs = require('fs');

var utils = {
  generatePDF: function (data, callback) {
    var filename = data.contact_person.replace(/ /g, '_') + '_' + new Date().getTime() + '.pdf';
    var file_path = 'public/pdf/' + filename;
    var doc = new PDFDocument();
    var file = fs.createWriteStream(file_path);

    doc.pipe(file);

    doc
      .fontSize(32)
      .text( "Gladmat 2016", { align: 'center'} );

    doc
      .fontSize(20)
      .text('Vågen Stavanger 20. – 23. juli 2016', { align: 'center' });

    doc
      .moveDown()
      .fontSize(14)
      .text('KONTRAKT', { align: 'center' });


    doc
      .moveDown()
      .fontSize(14)
      .text(JSON.stringify(data));

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        console.log('data[key]', data[key]);
        doc
          .moveDown()
          .fontSize(14)
          .text(key + ': ' + data[key]);
      }
    }

    doc.end();

    callback(null, file_path);
  }
};

module.exports = utils;



/*utils.generatePDF({ first_name: 'Vasil', last_name: 'Ivandivka' }, function (err, result) {});*/
