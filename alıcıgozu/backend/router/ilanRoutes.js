const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {
    getEv,
    getArsa,
    getHizmet,
    getIkinciEl,
    getIsyeri,
    getParca,


    getCarsi,

    getParcaDerece,
    getIsyeriDerece,
    getIkinciElDerece,
    getHizmetDerece,
    getArsaDerece,
    getEvDerece,


    getIlanById,
    createPayment,


    checkNumber,
    ePostaGonder,
    createEv,
    createArsa,
    createHizmet,
    createIkinciEl,
    createParca,
    createIsyeri,
fotoYukle,
    updateIlan,
    deleteIlan,  
    getFavori,
    isFavorite,
    toggleFavorite,
    changePass,
    getMyIlans,
    
} = require('../controllers/ilanControllers.js');
router.post('/user/favorites/:userId', getFavori);
router.post('/user/ilanlarim/:userId', getMyIlans);

router.post('/isFavorite', isFavorite);
router.post('/toggleFavorite', toggleFavorite);

router.get('/ilans/ev', getEv);
router.get('/ilans/arsa', getArsa);
router.get('/ilans/isyeri', getIsyeri);
router.get('/ilans/hizmet', getHizmet);
router.get('/ilans/ikinciel', getIkinciEl);
router.get('/ilans/parca', getParca);

router.get('/ilans/carsi', getCarsi);

router.get('/ilans/premiumparca', getParcaDerece);
router.get('/ilans/premiumev', getEvDerece);
router.get('/ilans/premiumikinci', getIkinciElDerece);
router.get('/ilans/premiumhizmet', getHizmetDerece);
router.get('/ilans/premiumisyeri', getIsyeriDerece);
router.get('/ilans/premiumarsa', getArsaDerece);




router.post('/changepass', changePass)
router.post('/create/ev', createEv);
router.post('/create/arsa', createArsa);
router.post('/create/isyeri', createIsyeri);
router.post('/create/hizmet', createHizmet);
router.post('/create/ikinciel', createIkinciEl);
router.post('/create/parca', createParca);
router.post('/upload', upload.array('images', 20), fotoYukle);


router.post('/pay', createPayment);

router.post('/send/mail', ePostaGonder);
router.post('/verifycode',checkNumber );

router.get('/ilans/:ilanId', getIlanById);
router.put('/ilans/edit', updateIlan);
router.delete('/:ilanId', deleteIlan);

module.exports = router;
 