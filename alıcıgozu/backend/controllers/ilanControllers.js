const Ev = require('../models/evSchema');
const Arsa = require('../models/arsaSchema');
const Hizmet = require('../models/hizmetSchema');
const IkinciEl = require('../models/ikinciElSchema');
const Isyeri = require('../models/isyeriSchema');
const Parca = require('../models/parcaSchema');
const User = require('../models/userSchema');
const fs = require('fs');
const aws = require('aws-sdk');
const multer = require('multer');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
require('dotenv').config();
async function getEv(req, res) {
  try {
    const { sehir, ilce, minfiyat, maxfiyat } = req.query;

    let filters = {};

    if (sehir) {
      filters.il = sehir;
    }

    if (ilce) {
      filters.ilce = ilce;
    }

    if (minfiyat || maxfiyat) {
      filters.fiyat = {};

      if (minfiyat) {
        filters.fiyat.$gte = parseInt(minfiyat);
      }

      if (maxfiyat) {
        filters.fiyat.$lte = parseInt(maxfiyat);
      }
    }

    const ev = await Ev.find(filters);
    res.json(ev);
  } catch (error) {
    console.error('İlanları getirirken bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

async function getArsa(req, res) {
  try {
    const { sehir, ilce, minfiyat, maxfiyat } = req.query;

    let filters = {};

    if (sehir) {
      filters.il = sehir;
    }

    if (ilce) {
      filters.ilce = ilce;
    }

    if (minfiyat || maxfiyat) {
      filters.fiyat = {};

      if (minfiyat) {
        filters.fiyat.$gte = parseInt(minfiyat);
      }

      if (maxfiyat) {
        filters.fiyat.$lte = parseInt(maxfiyat);
      }
    }

    const arsa = await Arsa.find(filters);
    res.json(arsa);
  } catch (error) {
    console.error('İlanları getirirken bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function getHizmet(req, res) {
  try {
    const { sehir, ilce, minfiyat, maxfiyat } = req.query;

    let filters = {};

    if (sehir) {
      filters.il = sehir;
    }

    if (ilce) {
      filters.ilce = ilce;
    }

    if (minfiyat || maxfiyat) {
      filters.fiyat = {};

      if (minfiyat) {
        filters.fiyat.$gte = parseInt(minfiyat);
      }

      if (maxfiyat) {
        filters.fiyat.$lte = parseInt(maxfiyat);
      }
    }

    const hizmet = await Hizmet.find(filters);
    res.json(hizmet);
  } catch (error) {
    console.error('İlanları getirirken bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function getIkinciEl(req, res) {
  try {
    const { sehir, ilce, minfiyat, maxfiyat } = req.query;

    let filters = {};

    if (sehir) {
      filters.il = sehir;
    }

    if (ilce) {
      filters.ilce = ilce;
    }

    if (minfiyat || maxfiyat) {
      filters.fiyat = {};

      if (minfiyat) {
        filters.fiyat.$gte = parseInt(minfiyat);
      }

      if (maxfiyat) {
        filters.fiyat.$lte = parseInt(maxfiyat);
      }
    }

    const ikinciEl = await IkinciEl.find(filters);
    res.json(ikinciEl);
  } catch (error) {
    console.error('İlanları getirirken bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function getIsyeri(req, res) {
  try {
    const { sehir, ilce, minfiyat, maxfiyat } = req.query;

    let filters = {};

    if (sehir) {
      filters.il = sehir;
    }

    if (ilce) {
      filters.ilce = ilce;
    }

    if (minfiyat || maxfiyat) {
      filters.fiyat = {};

      if (minfiyat) {
        filters.fiyat.$gte = parseInt(minfiyat);
      }

      if (maxfiyat) {
        filters.fiyat.$lte = parseInt(maxfiyat);
      }
    }

    const isyeri = await Isyeri.find(filters);
    res.json(isyeri);
  } catch (error) {
    console.error('İlanları getirirken bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function getParca(req, res) {
  try {
    const { sehir, ilce, minfiyat, maxfiyat } = req.query;

    let filters = {};

    if (sehir) {
      filters.il = sehir;
    }

    if (ilce) {
      filters.ilce = ilce;
    }

    if (minfiyat || maxfiyat) {
      filters.fiyat = {};

      if (minfiyat) {
        filters.fiyat.$gte = parseInt(minfiyat);
      }

      if (maxfiyat) {
        filters.fiyat.$lte = parseInt(maxfiyat);
      }
    }

    const parca = await Parca.find(filters);
    res.json(parca);
  } catch (error) {
    console.error('İlanları getirirken bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

async function getIlanById(req, res) {
  const ilanId = req.params.ilanId || req.body;
  try {
    const ilan = await Promise.all([
      Ev.findById(ilanId),
      Arsa.findById(ilanId),
      Hizmet.findById(ilanId),
      IkinciEl.findById(ilanId),
      Isyeri.findById(ilanId),
      Parca.findById(ilanId)
    ]);

    // İlanları kontrol ederek eşleşen ilanı bulun
    const matchedIlan = ilan.find(item => item !== null);

    if (!matchedIlan) {
      return res.status(404).json({ success: false, message: 'Eşleşen ilan bulunamadı' });
    }

    // Eşleşen ilanı bulduk, tıklanma sayısını 1 arttır
    matchedIlan.tiklanmaSayisi += 1;
    await matchedIlan.save(); // Değişiklikleri kaydet

    res.json(matchedIlan);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ success: false, message: 'Bir hata oluştu' });
  }
}









async function getFavori(req, res) {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const favoriteIlanIds = user.favorites;

    const schemaTypes = [Ev, Arsa, Hizmet, IkinciEl, Isyeri, Parca];

    const ilanlarPromises = schemaTypes.map(async (SchemaType) => {
      return SchemaType.find({ _id: { $in: favoriteIlanIds } });
    });

    const ilanlarResults = await Promise.all(ilanlarPromises);

    const favoriteIlanlar = ilanlarResults.flat();
    console.log(favoriteIlanlar)
    res.json(favoriteIlanlar);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
}










async function getMyIlans(req, res) {
  const userId = req.params.userId;

  try {
    const ilanPromises = [
      Ev.find({ userId: userId }),
      Arsa.find({ userId: userId }),
      Hizmet.find({ userId: userId }),
      IkinciEl.find({ userId: userId }),
      Isyeri.find({ userId: userId }),
      Parca.find({ userId: userId })
    ];

    const ilanResults = await Promise.all(ilanPromises);
    const myIlans = ilanResults.flat();

    res.json(myIlans);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ message: 'Bir hata oluştu' });
  }
}





const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.AWS_BUCKET_NAME,
});

// Multer ile dosya yükleme ayarları
const storage = multer.memoryStorage(); // Dosyaları bellekte tutuyoruz
const upload = multer({ storage: storage });

const fotoYukle = (req, res) => {
  const files = req.files;
  const imageKeys = [];

  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'Dosya eksik veya hatalı' });
  }

  let uploadedCount = 0; 

  files.forEach((file, index) => {
    const fileContent = fs.readFileSync(file.path);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: Date.now().toString() + Math.floor(Math.random() * (99 - 10 + 1)) + 10, 
      Body: fileContent,
    };

    s3.upload(params, (error, data) => {
      if (error) {
        console.error('S3 yükleme hatası:', error);
        return res.status(500).json({ error: 'Resim yükleme hatası' });
      }

      const imageKey = data.Key; 
      imageKeys.push(imageKey);

      uploadedCount++; 

      if (uploadedCount === files.length) {
        for (const file of files) {
          fs.unlinkSync(file.path);
        }

        console.log(imageKeys);
        return res.status(200).json(imageKeys);
      }
    });
  });
};




async function createEv(req, res) {
  const evdata = req.body;
  try {
    const ev = await Ev.create(evdata);
    res.status(201).json(ev);
  } catch (error) {
    console.error('İlan oluşturulurken bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function createArsa(req, res) {
  const arsadata = req.body;
  try {
    const arsa = await Arsa.create(arsadata);
    res.status(201).json(arsa);
  } catch (error) {
    console.error('İlan oluşturulurken bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function createHizmet(req, res) {
  const hizmetdata = req.body;
  try {
    const hizmet = await Hizmet.create(hizmetdata);
    res.status(201).json(hizmet);
  } catch (error) {
    console.error('İlan oluşturulurken bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function createIkinciEl(req, res) {
  const ikincieldata = req.body;
  try {
    const ikinciel = await IkinciEl.create(ikincieldata);
    res.status(201).json(ikinciel);
  } catch (error) {
    console.error('İlan oluşturulurken bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function createIsyeri(req, res) {
  const isyeriData = req.body;
  try {
    const isyeri = await Isyeri.create(isyeriData);

    const isyeriId = isyeri._id;

    res.status(201).json({id: isyeriId});
  } catch (error) {
    console.error('İlan oluşturulurken bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function createParca(req, res) {
  const parcadata = req.body;
  try {
    const parca = await Parca.create(parcadata);
    res.status(201).json(parca);
  } catch (error) {
    console.error('İlan oluşturulurken bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}




async function updateIlan(req, res) {
  const schemaTypes = [Ev, Arsa, Hizmet, IkinciEl, Isyeri, Parca];
  const ilanId = req.body.ilanId;
  const updateData = req.body;

  try {
    let updatedIlan = null;

    for (const SchemaType of schemaTypes) {
      updatedIlan = await SchemaType.findByIdAndUpdate(ilanId, updateData, { new: true });
      if (updatedIlan) {
        console.log(updatedIlan);
        break; 
      }
    }

    if (updatedIlan) {
      return res.status(200).json({ success: true, message: 'İlan güncellendi', ilan: updatedIlan });
    } else {
      return res.status(404).json({ success: false, message: 'İlan bulunamadı' });
    }
  } catch (error) {
    console.error('İlan güncelleme sırasında bir hata oluştu:', error);
    return res.status(500).json({ success: false, message: 'İlan güncelleme sırasında bir hata oluştu' });
  }
}


const schemaTypes = [Ev, Arsa, Hizmet, IkinciEl, Isyeri, Parca];




async function silS3Resimler(resimler) {
  for (const resimKey of resimler) {
    const params = {  
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: resimKey,
    };

    try {
      await s3.deleteObject(params).promise();
      console.log(`S3'den ${resimKey} adlı resim silindi.`);
    } catch (error) {
      console.error(`S3'den ${resimKey} adlı resim silinemedi. Hata: ${error.message}`);
    }
  }
}

async function kontrolVeSil(schema) {
  const ilanModel = mongoose.model(schema.modelName);
  const ilanlar = await ilanModel.find().exec();
  
  for (const ilan of ilanlar) {
    const now = new Date();
    const kayitZamani = new Date(ilan.createdAt);
    const zamanFarki = (now - kayitZamani) / (1000 * 60 * 60 * 24); 
  
    if (zamanFarki > 30) { 
      await silS3Resimler(ilan.resimler);
  
      await ilanModel.findByIdAndRemove(ilan._id).exec();
    }
  }
}  


for (const schema of schemaTypes) {
  kontrolVeSil(schema);
}






async function deleteIlan(req, res) {
  try {
    const ilanId = req.params.ilanId;

    const schemaTypes = [Ev, Arsa, Hizmet, IkinciEl, Isyeri, Parca];
    
    let deleted = false;
    for (const SchemaType of schemaTypes) {
      const ilan = await SchemaType.findById(ilanId);
      if (ilan) {
        silS3Resimler(ilan.resimler);
        await ilan.deleteOne();
        deleted = true;
        break; 
      }
    }

    if (!deleted) {
      return res.status(404).json({ message: 'İlan bulunamadı' });
    }

    res.json({ message: 'İlan başarıyla silindi' });
  } catch (error) {
    console.error('Error deleting ilan:', error);
    res.status(500).json({ message: 'İlan silinirken bir hata oluştu' });
  }
}




async function isFavorite(req, res) {
  const { userId, ilanId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    const isFavorite = user.favorites.includes(ilanId);
    res.json({ isFavorite });
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function toggleFavorite(req, res)  {
  const { userId, ilanId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    if (user.favorites.includes(ilanId)) {
      user.favorites = user.favorites.filter(id => id !== ilanId);
    } else {
      user.favorites.push(ilanId);
    }
    await user.save();
    res.json({ isFavorite: user.favorites.includes(ilanId) });
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

let verificationCode = '';
async function ePostaGonder(req, res) {
  try {
    const { email } = req.body;
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.mail, // Gönderenin e-posta adresi
    pass: process.env.pass, // Gönderenin e-posta şifresi
  },
});
verificationCode = generateRandomNumber(6); 
console.log(verificationCode);

    const mailOptions = {
      from: process.env.mail,
      to: email,
      subject: 'Alıcı Gözü Mail Doğrulama Kodu',
      html: `
        <html>
          <head>
            <style>
    
    
              .email-message {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
    
              h1 {
                color: #007BFF;
                font-size: 24px;
              }
            </style>
          </head>
          <body>
            <div class="email-message">
              <h1>Alıcı Gözü'ne Hoş Geldiniz!</h1>
              <p>
                Merhaba, bizi tercih ettiğiniz için teşekkür ederiz. İşte Mail doğrulama kodunuz:
                <strong>${verificationCode}</strong>
              </p>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    
   
  } catch (error) {
    console.error('E-posta gönderme sırasında bir hata oluştu:', error);
    res.status(500).json({ message: 'E-posta gönderme sırasında bir hata oluştu.' });
  }
}
 function generateRandomNumber(length) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function checkNumber(req, res) {
  const { clientcode } = req.body;
  if (clientcode == verificationCode) {
    res.status(200).json({ message: 'success' });
  } else {
    res.status(400).json({ message: 'mistake' });
  }
}

async function changePass(req, res) {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email: email });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error('Şifre değiştirme sırasında bir hata oluştu:', error);
    res.status(500).json({ message: 'Şifre değiştirme sırasında bir hata oluştu' });
  }
}
const Iyzipay = require('iyzipay');


const iyzipay = require('iyzipay');
const { Console } = require('console');

const apiKey = process.env.apiKey;
const secretKey = process.env.secretKey;

const createPayment = async (req, res) => {



const cardName = req.body.cardName; 
const nameParts = cardName.split(' ');
const surname = nameParts.pop();
const name = nameParts.join(' ');


const expire = req.body.expire; 
const expiryParts = expire.split('/');
const expireMonth = expiryParts[0];
const expireYear = expiryParts[1]; 


  try {
    const requestBody = {
      locale: 'tr',
      price: req.body.amount, 
      paidPrice: req.body.amount,
      currency: 'TRY',
      installment: '1',
      paymentCard: {
        cardHolderName: name+surname,
        cardNumber: req.body.cardNumber,
        expireMonth: expireMonth,
        expireYear: expireYear,
        cvc: req.body.cvc,
        registerCard: 0,
      },
      buyer: {
        id: req.body.userId,
        name: name,
        surname: surname,
        email: req.body.eposta,
        identityNumber: req.body.tckno,
        registrationAddress:req.body.adress,
        ip: req.ip,
        city: req.body.city,
        country: 'Turkey',
      },
      billingAddress: {
        contactName: req.body.cardName,
        city: req.body.city,
        country: 'Turkey',
        address:req.body.adress,
      },
      basketItems: [
        {
          id: '80B',
          name: 'alıcıgözü.com premium ilan',
          category1: 'Category 1',
          itemType: iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
          price: req.body.amount,
        },
      ],
    };

    const iyzipayOptions = {
      apiKey: apiKey,
      secretKey: secretKey,
      uri: 'https://sandbox-api.iyzipay.com',
    };

    const iyzipayClient = new iyzipay(iyzipayOptions);

    iyzipayClient.payment.create(requestBody, function (err, result) {
      if (err) {
        console.error('Ödeme işlemi başarısız: ', err);
        res.status(400).json({ error: 'Ödeme işlemi başarısız' });
      } else {
        console.log(requestBody);
        console.log('Ödeme işlemi başarılı: ', result);
        res.status(200).json({ success: 'Ödeme işlemi başarılı' });
      }
    });
  } catch (error) {
    console.error('Ödeme işlemi sırasında bir hata oluştu:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
};


async function getCarsi(req, res) {
  try {
    const ilanlar = [];

    const ciktiIlanlar = async (schemaType, count) => {
      return await schemaType.aggregate([
        { $match: { carsiDate: { $exists: true } } },
        { $sample: { size: count } }
      ]);
    };

    ilanlar.push(...await ciktiIlanlar(Ev, 10));
    ilanlar.push(...await ciktiIlanlar(Isyeri, 6));
    ilanlar.push(...await ciktiIlanlar(Hizmet, 4));
    ilanlar.push(...await ciktiIlanlar(Parca, 3));  
    ilanlar.push(...await ciktiIlanlar(IkinciEl, 2));
    ilanlar.push(...await ciktiIlanlar(Arsa, 5));

    ilanlar.sort(() => Math.random() - 0.5);
    res.json(ilanlar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Veriler alınamadı' });
  }
}

async function removeExpiredCarsiDates() {
  try {
    const currentDateMillis = Date.now();
    const expirationDateMillis = currentDateMillis - (30 * 24 * 60 * 60 * 1000);


    const schemas = [Ev, Isyeri, Hizmet, Parca, IkinciEl, Arsa];

    for (const schemaType of schemas) {
      await schemaType.updateMany(
        { carsiDate: { $exists: true, $lt: expirationDateMillis } },
        { $unset: { carsiDate: 1 } }
      );
    }

    console.log('Carsi tarihleri kaldırıldı');
  } catch (error) {
    console.error(error);
  }


}
async function updateCarsiDate() {
  const currentDate = new Date();
  const thirtyDaysAgo = new Date(currentDate - 30 * 24 * 60 * 60 * 1000);

  const schemas = [Ev, Isyeri, Hizmet, Parca, IkinciEl, Arsa];

  for (const schema of schemas) {
    try {
      const result = await schema.updateMany(
        {
          dereceDate: { $exists: true, $ne: null },
          dereceDate: { $lt: thirtyDaysAgo },
        },
        { $unset: { carsiDate: '' } }
      );

      console.log(`Updated ${result.nModified} documents in ${schema.modelName}`);
    } catch (error) {
      console.error(`Error updating ${schema.modelName}: ${error}`);
    }
  }
}

const gun = 24 * 60 * 60 * 1000; 
setInterval(removeExpiredCarsiDates, gun);



async function getParcaDerece(req, res) {
  try {
    const parcaDate = await Parca.find({ dereceDate: { $exists: true, $ne: null, $ne: '' } });
    res.status(200).json(parcaDate);
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function getEvDerece(req, res) {
  try {
    const evDate = await Ev.find({ dereceDate: { $exists: true, $ne: null, $ne: '' } });
    res.status(200).json(evDate);
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function getArsaDerece(req, res) {
  try {
    const arsaDate = await Arsa.find({ dereceDate: { $exists: true, $ne: null, $ne: '' } });
    res.status(200).json(arsaDate);
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function getHizmetDerece(req, res) {
  try {
    const hizmetDate = await Hizmet.find({ dereceDate: { $exists: true, $ne: null, $ne: '' } });
    res.status(200).json(hizmetDate);
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function getIkinciElDerece(req, res) {
  try {
    const IkinciElDate = await IkinciEl.find({ dereceDate: { $exists: true, $ne: null, $ne: '' } });
    res.status(200).json(IkinciElDate);
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}
async function getIsyeriDerece(req, res) {
  try {
    const isyeriDate = await Isyeri.find({ dereceDate: { $exists: true, $ne: null, $ne: '' } });
    res.status(200).json(isyeriDate);
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

async function removeExpiredDereceDates() {
  try {
    const currentDateMillis = Date.now();
    const expirationDateMillis = currentDateMillis - ( 30 *24 * 60 * 60 * 1000);

    const schemas = [Ev, Isyeri, Hizmet, Parca, IkinciEl, Arsa];

    for (const schemaType of schemas) {
      await schemaType.updateMany(
        { dereceDate: { $exists: true, $lt: expirationDateMillis } },
        { $unset: { dereceDate: 1 } }
      );
    }

    console.log('Derece tarihleri kaldırıldı');
  } catch (error) {
    console.error(error);
  }
}

const expire = 24 * 60 * 60 * 1000;
setInterval(removeExpiredDereceDates, expire);




module.exports = {
  getEv,
  getArsa,
  getHizmet,
  getIkinciEl,
  getIsyeri,
  getParca,
  changePass,
  checkNumber,
  getIlanById,


getCarsi,


getParcaDerece,
getIsyeriDerece,
getIkinciElDerece,
getHizmetDerece,
getArsaDerece,
getEvDerece,




  createPayment,

  createEv,
  createArsa,
  createHizmet,
  createIkinciEl,
  createParca,
  createIsyeri,
  fotoYukle,

  ePostaGonder,

  updateIlan,
  deleteIlan,
  getFavori,
  isFavorite,
  toggleFavorite,
  getMyIlans
};
