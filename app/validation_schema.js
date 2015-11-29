/**
 * Created by vanuwa on 11/29/15.
 */
module.exports = {
  company_name: {
    notEmpty: {
      errorMessage: 'Firma is required and could not be empty.'
    }
  },
  tax_id: {
    notEmpty: {
      errorMessage: 'Organisasjonsnummer is required and could not be empty.'
    }
  },
  contact_person: {
    notEmpty: {
      errorMessage: 'Kontaktperson is required and could not be empty.'
    }
  },
  address: {
    notEmpty: {
      errorMessage: 'Adresse is required and could not be empty.'
    }
  },
  zip_code: {
    notEmpty: {
      errorMessage: 'Postnummer is required and could not be empty.'
    }
  },
  email: {
    isEmail: {
      errorMessage: 'Email field is invalid.'
    }
  },
  city: {
    notEmpty: {
      errorMessage: 'Poststed is required and could not be empty.'
    }
  },
  cellphone: {
    notEmpty: {
      errorMessage: 'Mobil is required and could not be empty.'
    }
  },
  billing_address: {
    notEmpty: {
      errorMessage: 'Fakturaadresse is required and could not be empty.'
    }
  }
};