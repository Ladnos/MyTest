import {Router} from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";
const sending  =  JSON.parse(fs.readFileSync('D:/openserver/domains/vueexpress/json/tests.json'))
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router()
router.get('/tests',(req,res)=>{
    // res.json(sending)
    // console.log(__dirname)
    res.json(sending.tests)
})


export default router
