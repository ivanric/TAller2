(function($) {
    /**
     * Spanish language package
     * Translated by @vadail
     */
    FormValidation.I18n = $.extend(true, FormValidation.I18n, {
        'es_ES': {
            base64: {
                'default': 'Por favor introduce un valor valido en base 64'
            },
            between: {
                'default': 'Por favor introduce un valor entre %s y %s',
                notInclusive: 'Por favor introduce un valor sÃ³lo entre %s and %s'
            },
            bic: {
                'default': 'Por favor introduce un numero BIC valido'
            },
            callback: {
                'default': 'Por favor introduce un valor valido'
            },
            choice: {
                'default': 'Por favor introduce un valor valido',
                less: 'Por favor elija %s opciones como mÃ­nimo',
                more: 'Por favor elija %s optiones como mÃ¡ximo',
                between: 'Por favor elija de %s a %s opciones'
            },
            color: {
                'default': 'Por favor introduce un color valido'
            },
            creditCard: {
                'default': 'Por favor introduce un numero valido de tarjeta de crÃ©dito'
            },
            cusip: {
                'default': 'Por favor introduce un numero CUSIP valido'
            },
            cvv: {
                'default': 'Por favor introduce un numero CVV valido'
            },
            date: {
                'default': 'Por favor introduce una fecha vÃ¡lida',
                min: 'Por favor introduce una fecha posterior al %s',
                max: 'Por favor introduce una fecha previa al %s',
                range: 'Por favor introduce una fecha entre el %s y el %s'
            },
            different: {
                'default': 'Por favor introduce un valor distinto'
            },
            digits: {
                'default': 'Por favor introduce sÃ³lo dÃ­gitos'
            },
            ean: {
                'default': 'Por favor introduce un numero EAN valido'
            },
            ein: {
                'default': 'Por favor introduce un numero EIN valido'
            },
            emailAddress: {
                'default': 'Por favor introduce un email valido'
            },
            file: {
                'default': 'Por favor elija un archivo valido'
            },
            greaterThan: {
                'default': 'Por favor introduce un valor mayor o igual a %s',
                notInclusive: 'Por favor introduce un valor mayor que %s'
            },
            grid: {
                'default': 'Por favor introduce un numero GRId valido'
            },
            hex: {
                'default': 'Por favor introduce un valor hexadecimal valido'
            },
            duplicate: {
                'default': 'Registro Duplicado'
            },
            iban: {
                'default': 'Por favor introduce un numero IBAN valido',
                country: 'Por favor introduce un numero IBAN valido en %s',
                countries: {
                    AD: 'Andorra',
                    AE: 'Emiratos Ã�rabes Unidos',
                    AL: 'Albania',
                    AO: 'Angola',
                    AT: 'Austria',
                    AZ: 'AzerbaiyÃ¡n',
                    BA: 'Bosnia-Herzegovina',
                    BE: 'BÃ©lgica',
                    BF: 'Burkina Faso',
                    BG: 'Bulgaria',
                    BH: 'BarÃ©in',
                    BI: 'Burundi',
                    BJ: 'BenÃ­n',
                    BR: 'Brasil',
                    CH: 'Suiza',
                    CI: 'Costa de Marfil',
                    CM: 'CamerÃºn',
                    CR: 'Costa Rica',
                    CV: 'Cabo Verde',
                    CY: 'Cyprus',
                    CZ: 'RepÃºblica Checa',
                    DE: 'Alemania',
                    DK: 'Dinamarca',
                    DO: 'RepÃºblica Dominicana',
                    DZ: 'Argelia',
                    EE: 'Estonia',
                    ES: 'EspaÃ±a',
                    FI: 'Finlandia',
                    FO: 'Islas Feroe',
                    FR: 'Francia',
                    GB: 'Reino Unido',
                    GE: 'Georgia',
                    GI: 'Gibraltar',
                    GL: 'Groenlandia',
                    GR: 'Grecia',
                    GT: 'Guatemala',
                    HR: 'Croacia',
                    HU: 'HungrÃ­a',
                    IE: 'Irlanda',
                    IL: 'Israel',
                    IR: 'Iran',
                    IS: 'Islandia',
                    IT: 'Italia',
                    JO: 'Jordania',
                    KW: 'Kuwait',
                    KZ: 'KazajistÃ¡n',
                    LB: 'LÃ­bano',
                    LI: 'Liechtenstein',
                    LT: 'Lituania',
                    LU: 'Luxemburgo',
                    LV: 'Letonia',
                    MC: 'MÃ³naco',
                    MD: 'Moldavia',
                    ME: 'Montenegro',
                    MG: 'Madagascar',
                    MK: 'Macedonia',
                    ML: 'MalÃ­',
                    MR: 'Mauritania',
                    MT: 'Malta',
                    MU: 'Mauricio',
                    MZ: 'Mozambique',
                    NL: 'PaÃ­ses Bajos',
                    NO: 'Noruega',
                    PK: 'PakistÃ¡n',
                    PL: 'Poland',
                    PS: 'Palestina',
                    PT: 'Portugal',
                    QA: 'Catar',
                    RO: 'Rumania',
                    RS: 'Serbia',
                    SA: 'Arabia Saudita',
                    SE: 'Suecia',
                    SI: 'Eslovenia',
                    SK: 'Eslovaquia',
                    SM: 'San Marino',
                    SN: 'Senegal',
                    TL: 'Timor Oriental',
                    TN: 'TÃºnez',
                    TR: 'TurquÃ­a',
                    VG: 'Islas VÃ­rgenes BritÃ¡nicas',
                    XK: 'RepÃºblica de Kosovo'
                }
            },
            id: {
                'default': 'Por favor introduce un numero de identificaciÃ³n valido',
                country: 'Por favor introduce un numero valido de identificaciÃ³n en %s',
                countries: {
                    BA: 'Bosnia Herzegovina',
                    BG: 'Bulgaria',
                    BR: 'Brasil',
                    CH: 'Suiza',
                    CL: 'Chile',
                    CN: 'China',
                    CZ: 'RepÃºblica Checa',
                    DK: 'Dinamarca',
                    EE: 'Estonia',
                    ES: 'EspaÃ±a',
                    FI: 'Finlandia',
                    HR: 'Croacia',
                    IE: 'Irlanda',
                    IS: 'Islandia',
                    LT: 'Lituania',
                    LV: 'Letonia',
                    ME: 'Montenegro',
                    MK: 'Macedonia',
                    NL: 'PaÃ­ses Bajos',
                    PL: 'Poland',
                    RO: 'Romania',
                    RS: 'Serbia',
                    SE: 'Suecia',
                    SI: 'Eslovenia',
                    SK: 'Eslovaquia',
                    SM: 'San Marino',
                    TH: 'Tailandia',
                    ZA: 'SudÃ¡frica'
                }
            },
            identical: {
                'default': 'Por favor introduce el mismo valor'
            },
            imei: {
                'default': 'Por favor introduce un numero IMEI valido'
            },
            imo: {
                'default': 'Por favor introduce un numero IMO valido'
            },
            integer: {
                'default': 'Por favor introduce un numero valido'
            },
            ip: {
                'default': 'Por favor introduce una direcciÃ³n IP vÃ¡lida',
                ipv4: 'Por favor introduce una direcciÃ³n IPv4 vÃ¡lida',
                ipv6: 'Por favor introduce una direcciÃ³n IPv6 vÃ¡lida'
            },
            isbn: {
                'default': 'Por favor introduce un numero ISBN valido'
            },
            isin: {
                'default': 'Por favor introduce un numero ISIN valido'
            },
            ismn: {
                'default': 'Por favor introduce un numero ISMN valido'
            },
            issn: {
                'default': 'Por favor introduce un numero ISSN valido'
            },
            lessThan: {
                'default': 'Por favor introduce un valor menor o igual a %s',
                notInclusive: 'Por favor introduce un valor menor que %s'
            },
            mac: {
                'default': 'Por favor introduce una direcciÃ³n MAC vÃ¡lida'
            },
            meid: {
                'default': 'Por favor introduce un numero MEID valido'
            },
            notEmpty: {
                'default': 'Por favor introduce un valor'
            },
            numeric: {
                'default': 'Por favor introduce un numero decimal valido'
            },
            phone: {
                'default': 'Por favor introduce un numero valido de telÃ©fono',
                country: 'Por favor introduce un numero valido de telÃ©fono en %s',
                countries: {
                    AE: 'Emiratos Ã�rabes Unidos',
                    BG: 'Bulgaria',
                    BR: 'Brasil',
                    CN: 'China',
                    CZ: 'RepÃºblica Checa',
                    DE: 'Alemania',
                    DK: 'Dinamarca',
                    ES: 'EspaÃ±a',
                    FR: 'Francia',
                    GB: 'Reino Unido',
                    IN: 'India',
                    MA: 'Marruecos',
                    NL: 'PaÃ­ses Bajos',
                    PK: 'PakistÃ¡n',
                    RO: 'Rumania',
                    RU: 'Rusa',
                    SK: 'Eslovaquia',
                    TH: 'Tailandia',
                    US: 'Estados Unidos',
                    VE: 'Venezuela'
                }
            },
            promise: {
                'default': 'Por favor introduce un valor valido'
            },
            regexp: {
                'default': 'Por favor introduce un valor que coincida con el patrÃ³n'
            },
            remote: {
                'default': 'Por favor introduce un valor valido'
            },
            rtn: {
                'default': 'Por favor introduce un numero RTN valido'
            },
            sedol: {
                'default': 'Por favor introduce un numero SEDOL valido'
            },
            siren: {
                'default': 'Por favor introduce un numero SIREN valido'
            },
            siret: {
                'default': 'Por favor introduce un numero SIRET valido'
            },
            step: {
                'default': 'Por favor introduce un paso valido de %s'
            },
            stringCase: {
                'default': 'Por favor introduce sÃ³lo caracteres en minÃºscula',
                upper: 'Por favor introduce sÃ³lo caracteres en mayÃºscula'
            },
            stringLength: {
                'default': 'Por favor introduce un valor con una longitud vÃ¡lida',
                less: 'Por favor introduce menos de %s caracteres',
                more: 'Por favor introduce mÃ¡s de %s caracteres',
                between: 'Por favor introduce un valor con una longitud entre %s y %s caracteres'
            },
            uri: {
                'default': 'Por favor introduce una URI vÃ¡lida'
            },
            uuid: {
                'default': 'Por favor introduce un numero UUID valido',
                version: 'Por favor introduce una versiÃ³n UUID vÃ¡lida para %s'
            },
            vat: {
                'default': 'Por favor introduce un numero IVA valido',
                country: 'Por favor introduce un numero IVA valido en %s',
                countries: {
                    AT: 'Austria',
                    BE: 'BÃ©lgica',
                    BG: 'Bulgaria',
                    BR: 'Brasil',
                    CH: 'Suiza',
                    CY: 'Chipre',
                    CZ: 'RepÃºblica Checa',
                    DE: 'Alemania',
                    DK: 'Dinamarca',
                    EE: 'Estonia',
                    ES: 'EspaÃ±a',
                    FI: 'Finlandia',
                    FR: 'Francia',
                    GB: 'Reino Unido',
                    GR: 'Grecia',
                    EL: 'Grecia',
                    HU: 'HungrÃ­a',
                    HR: 'Croacia',
                    IE: 'Irlanda',
                    IS: 'Islandia',
                    IT: 'Italia',
                    LT: 'Lituania',
                    LU: 'Luxemburgo',
                    LV: 'Letonia',
                    MT: 'Malta',
                    NL: 'PaÃ­ses Bajos',
                    NO: 'Noruega',
                    PL: 'Polonia',
                    PT: 'Portugal',
                    RO: 'RumanÃ­a',
                    RU: 'Rusa',
                    RS: 'Serbia',
                    SE: 'Suecia',
                    SI: 'Eslovenia',
                    SK: 'Eslovaquia',
                    VE: 'Venezuela',
                    ZA: 'SudÃ¡frica'
                }
            },
            vin: {
                'default': 'Por favor introduce un numero VIN valido'
            },
            zipCode: {
                'default': 'Por favor introduce un codigo postal valido',
                country: 'Por favor introduce un codigo postal valido en %s',
                countries: {
                    AT: 'Austria',
                    BG: 'Bulgaria',
                    BR: 'Brasil',
                    CA: 'CanadÃ¡',
                    CH: 'Suiza',
                    CZ: 'RepÃºblica Checa',
                    DE: 'Alemania',
                    DK: 'Dinamarca',
                    ES: 'EspaÃ±a',
                    FR: 'Francia',
                    GB: 'Reino Unido',
                    IE: 'Irlanda',
                    IN: 'India',
                    IT: 'Italia',
                    MA: 'Marruecos',
                    NL: 'PaÃ­ses Bajos',
                    PL: 'Poland',
                    PT: 'Portugal',
                    RO: 'RumanÃ­a',
                    RU: 'Rusa',
                    SE: 'Suecia',
                    SG: 'Singapur',
                    SK: 'Eslovaquia',
                    US: 'Estados Unidos'
                }
            }
        }
    });
}(jQuery));
