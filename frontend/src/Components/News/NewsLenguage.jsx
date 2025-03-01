const NewsLenguage = ({ setLanguage }) => {

    const languages = [
        { code: "en", name: "English" }, { code: "af", name: "Afrikaans" }, { code: "sq", name: "Albanian" }, { code: "am", name: "Amharic" },
        { code: "ar", name: "Arabic" }, { code: "hy", name: "Armenian" }, { code: "as", name: "Assamese" },
        { code: "az", name: "Azerbaijani" }, { code: "bm", name: "Bambara" }, { code: "eu", name: "Basque" },
        { code: "be", name: "Belarusian" }, { code: "bn", name: "Bengali" }, { code: "bs", name: "Bosnian" },
        { code: "bg", name: "Bulgarian" }, { code: "my", name: "Burmese" }, { code: "ca", name: "Catalan" },
        { code: "ckb", name: "Central Kurdish" }, { code: "zh", name: "Chinese" }, { code: "hr", name: "Croatian" },
        { code: "cs", name: "Czech" }, { code: "da", name: "Danish" }, { code: "nl", name: "Dutch" },
        { code: "et", name: "Estonian" }, { code: "pi", name: "Filipino" },
        { code: "fi", name: "Finnish" }, { code: "fr", name: "French" }, { code: "gl", name: "Galician" },
        { code: "ka", name: "Georgian" }, { code: "de", name: "German" }, { code: "el", name: "Greek" },
        { code: "gu", name: "Gujarati" }, { code: "ha", name: "Hausa" }, { code: "he", name: "Hebrew" },
        { code: "hi", name: "Hindi" }, { code: "hu", name: "Hungarian" }, { code: "is", name: "Icelandic" },
        { code: "id", name: "Indonesian" }, { code: "it", name: "Italian" }, { code: "jp", name: "Japanese" },
        { code: "kn", name: "Kannada" }, { code: "kz", name: "Kazakh" }, { code: "kh", name: "Khmer" },
        { code: "rw", name: "Kinyarwanda" }, { code: "ko", name: "Korean" }, { code: "ku", name: "Kurdish" },
        { code: "lv", name: "Latvian" }, { code: "lt", name: "Lithuanian" }, { code: "lb", name: "Luxembourgish" },
        { code: "mk", name: "Macedonian" }, { code: "ms", name: "Malay" }, { code: "ml", name: "Malayalam" },
        { code: "mt", name: "Maltese" }, { code: "mi", name: "Maori" }, { code: "mr", name: "Marathi" },
        { code: "mn", name: "Mongolian" }, { code: "ne", name: "Nepali" }, { code: "no", name: "Norwegian" },
        { code: "or", name: "Oriya" }, { code: "ps", name: "Pashto" }, { code: "fa", name: "Persian" },
        { code: "pl", name: "Polish" }, { code: "pt", name: "Portuguese" }, { code: "pa", name: "Punjabi" },
        { code: "ro", name: "Romanian" }, { code: "ru", name: "Russian" }, { code: "sm", name: "Samoan" },
        { code: "sr", name: "Serbian" }, { code: "sn", name: "Shona" }, { code: "sd", name: "Sindhi" },
        { code: "si", name: "Sinhala" }, { code: "sk", name: "Slovak" }, { code: "sl", name: "Slovenian" },
        { code: "so", name: "Somali" }, { code: "es", name: "Spanish" }, { code: "sw", name: "Swahili" },
        { code: "sv", name: "Swedish" }, { code: "tg", name: "Tajik" }, { code: "ta", name: "Tamil" },
        { code: "te", name: "Telugu" }, { code: "th", name: "Thai" }, { code: "zht", name: "Traditional Chinese" },
        { code: "tr", name: "Turkish" }, { code: "tk", name: "Turkmen" }, { code: "uk", name: "Ukrainian" },
        { code: "ur", name: "Urdu" }, { code: "uz", name: "Uzbek" }, { code: "vi", name: "Vietnamese" },
        { code: "cy", name: "Welsh" }, { code: "zu", name: "Zulu" }
    ];

    return (


        <div className="d-flex justify-content-start align-items-center px-2">

            {/* Language Dropdown */}
            <select className="form-select w-auto" onChange={(e) => setLanguage(e.target.value)}>
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
            </select>
        </div>


    );
};

export default NewsLenguage;
