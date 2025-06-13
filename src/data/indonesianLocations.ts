export interface IndonesianLocation {
  province: string;
  cities: {
    name: string;
    districts?: string[];
  }[];
}

export const indonesianLocations: IndonesianLocation[] = [
  {
    province: "DKI Jakarta",
    cities: [
      {
        name: "Jakarta Pusat",
        districts: ["Menteng", "Tanah Abang", "Gambir", "Sawah Besar", "Kemayoran", "Senen", "Cempaka Putih", "Johar Baru"]
      },
      {
        name: "Jakarta Utara",
        districts: ["Penjaringan", "Pademangan", "Tanjung Priok", "Koja", "Kelapa Gading", "Cilincing"]
      },
      {
        name: "Jakarta Barat",
        districts: ["Tambora", "Taman Sari", "Grogol Petamburan", "Palmerah", "Kebon Jeruk", "Kembangan", "Cengkareng", "Kalideres"]
      },
      {
        name: "Jakarta Selatan",
        districts: ["Kebayoran Baru", "Kebayoran Lama", "Pesanggrahan", "Cilandak", "Pasar Minggu", "Jagakarsa", "Mampang Prapatan", "Pancoran", "Tebet", "Setiabudi"]
      },
      {
        name: "Jakarta Timur",
        districts: ["Matraman", "Pulogadung", "Jatinegara", "Cakung", "Duren Sawit", "Kramat Jati", "Makasar", "Pasar Rebo", "Ciracas", "Cipayung"]
      }
    ]
  },
  {
    province: "Jawa Barat",
    cities: [
      {
        name: "Bandung",
        districts: ["Sukasari", "Coblong", "Cidadap", "Bandung Wetan", "Sumur Bandung", "Andir", "Cicendo", "Bandung Kulon", "Bojongloa Kaler", "Astana Anyar"]
      },
      {
        name: "Bekasi",
        districts: ["Bekasi Barat", "Bekasi Timur", "Bekasi Utara", "Bekasi Selatan", "Bantargebang", "Pondokgede", "Jatisampurna", "Jatiasih", "Mustika Jaya", "Medan Satria", "Rawalumbu", "Pondokmelati"]
      },
      {
        name: "Bogor",
        districts: ["Bogor Tengah", "Bogor Utara", "Bogor Selatan", "Bogor Timur", "Bogor Barat", "Tanah Sareal"]
      },
      {
        name: "Depok",
        districts: ["Pancoran Mas", "Sukmajaya", "Limo", "Sawangan", "Bojong Sari", "Beji", "Cipayung", "Cilodong", "Cinere", "Tapos", "Cimanggis"]
      },
      {
        name: "Tangerang",
        districts: ["Tangerang", "Cipondoh", "Karawaci", "Pinang", "Larangan", "Karang Tengah", "Batuceper", "Neglasari", "Benda", "Jatiuwung", "Cibodas", "Periuk", "Ciledug"]
      }
    ]
  },
  {
    province: "Jawa Tengah",
    cities: [
      {
        name: "Semarang",
        districts: ["Semarang Tengah", "Semarang Utara", "Semarang Timur", "Semarang Selatan", "Semarang Barat", "Gayamsari", "Genuk", "Pedurungan", "Banyumanik", "Gunungpati", "Tembalang", "Ngaliyan", "Mijen", "Tugu", "Candisari", "Gajahmungkur"]
      },
      {
        name: "Solo (Surakarta)",
        districts: ["Laweyan", "Serengan", "Pasarkliwon", "Jebres", "Banjarsari"]
      },
      {
        name: "Yogyakarta",
        districts: ["Danurejan", "Gedongtengen", "Gondokusuman", "Jetis", "Kotagede", "Kraton", "Mantrijeron", "Mergangsan", "Ngampilan", "Pakualaman", "Tegalrejo", "Umbulharjo", "Wirobrajan", "Gondomanan"]
      }
    ]
  },
  {
    province: "Jawa Timur",
    cities: [
      {
        name: "Surabaya",
        districts: ["Genteng", "Tegalsari", "Bubutan", "Simokerto", "Pabean Cantian", "Semampir", "Krembangan", "Kenjeran", "Bulak", "Tambaksari", "Gubeng", "Rungkut", "Tenggilis Mejoyo", "Gunung Anyar", "Sukolilo", "Mulyorejo", "Sawahan", "Wonokromo", "Karang Pilang", "Jambangan", "Gayungan", "Wonocolo", "Wiyung", "Lakarsantri", "Benowo", "Pakal", "Asemrowo", "Sukomanunggal", "Tandes", "Dukuh Pakis", "Gayungan"]
      },
      {
        name: "Malang",
        districts: ["Klojen", "Blimbing", "Kedungkandang", "Sukun", "Lowokwaru"]
      },
      {
        name: "Sidoarjo",
        districts: ["Sidoarjo", "Buduran", "Candi", "Porong", "Krembung", "Tulangan", "Tanggulangin", "Jabon", "Krian", "Balongbendo", "Wonoayu", "Tarik", "Prambon", "Taman", "Sukodono", "Gedangan", "Sedati", "Waru"]
      }
    ]
  },
  {
    province: "Banten",
    cities: [
      {
        name: "Tangerang Selatan",
        districts: ["Serpong", "Serpong Utara", "Pondok Aren", "Ciputat", "Ciputat Timur", "Pamulang", "Setu"]
      },
      {
        name: "Serang",
        districts: ["Serang", "Kasemen", "Walantaka", "Curug", "Cipocok Jaya", "Taktakan"]
      }
    ]
  },
  {
    province: "Sumatera Utara",
    cities: [
      {
        name: "Medan",
        districts: ["Medan Kota", "Medan Barat", "Medan Timur", "Medan Utara", "Medan Selatan", "Medan Area", "Medan Johor", "Medan Amplas", "Medan Denai", "Medan Labuhan", "Medan Tuntungan", "Medan Helvetia", "Medan Petisah", "Medan Baru", "Medan Selayang", "Medan Sunggal", "Medan Perjuangan", "Medan Tembung", "Medan Deli", "Medan Marelan", "Medan Belawan"]
      }
    ]
  },
  {
    province: "Sumatera Barat",
    cities: [
      {
        name: "Padang",
        districts: ["Padang Selatan", "Padang Timur", "Padang Utara", "Padang Barat", "Nanggalo", "Kuranji", "Pauh", "Koto Tangah", "Lubuk Kilangan", "Lubuk Begalung", "Bungus Teluk Kabung"]
      }
    ]
  },
  {
    province: "Kalimantan Timur",
    cities: [
      {
        name: "Balikpapan",
        districts: ["Balikpapan Kota", "Balikpapan Selatan", "Balikpapan Timur", "Balikpapan Utara", "Balikpapan Tengah", "Balikpapan Barat"]
      },
      {
        name: "Samarinda",
        districts: ["Samarinda Kota", "Samarinda Seberang", "Samarinda Ulu", "Samarinda Ilir", "Samarinda Utara", "Loa Janan Ilir", "Sungai Kunjang", "Sambutan", "Palaran", "Loa Janan Ilir"]
      }
    ]
  },
  {
    province: "Sulawesi Selatan",
    cities: [
      {
        name: "Makassar",
        districts: ["Mariso", "Mamajang", "Tamalate", "Rappocini", "Makassar", "Ujung Pandang", "Wajo", "Bontoala", "Ujung Tanah", "Tallo", "Panakkukang", "Manggala", "Biringkanaya", "Tamalanrea"]
      }
    ]
  },
  {
    province: "Bali",
    cities: [
      {
        name: "Denpasar",
        districts: ["Denpasar Selatan", "Denpasar Timur", "Denpasar Barat", "Denpasar Utara"]
      },
      {
        name: "Badung",
        districts: ["Kuta Selatan", "Kuta", "Kuta Utara", "Mengwi", "Abiansemal", "Petang"]
      }
    ]
  }
];

export const getAllProvinces = (): string[] => {
  return indonesianLocations.map(location => location.province);
};

export const getCitiesByProvince = (province: string): string[] => {
  const location = indonesianLocations.find(loc => loc.province === province);
  return location ? location.cities.map(city => city.name) : [];
};

export const getDistrictsByCity = (province: string, city: string): string[] => {
  const location = indonesianLocations.find(loc => loc.province === province);
  if (!location) return [];
  
  const cityData = location.cities.find(c => c.name === city);
  return cityData?.districts || [];
};