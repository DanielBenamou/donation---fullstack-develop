import express, { NextFunction, Request, Response } from 'express';
import { request } from 'http';
import logic from '../logic/logic';
import Donation from '../model/donation';
import Payment from '../model/payment';

const router = express.Router();

router.get("/api/payments", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const payments = await logic.getAllPayments()
        response.json(payments)
        console.log(payments)
    }
    catch (err: any) {
        next(err)
    }
})

router.get("/api/donations", async (request: Request, response: Response, next: NextFunction) => {
    const donations = await logic.getAllDonations()
    try {
        if (Donation.length > 0) {
            response.json(donations)
        }
        else {
            response.statusMessage = "No Donations Available"
        }

    }
    catch (err) {
        next(err)
    }
})

router.post("/api/new_donation", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let donation = new Donation(request.body)
        const newDonation = await logic.addDonation(donation);
        response.status(201).json(newDonation);
    }
    catch (err: any) {
        next(err)
    }
})
router.delete("/api/delete/:donationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const donationId = +request.params.donationId;
        await logic.deleteDonation(donationId);
        response.status(200).json("Done")
    }
    catch (err: any) {
        next(err);
    }

})

router.put("/api/cancel/:cancelCode/:donationId", async (request: Request, response: Response, next: NextFunction) => {
    const cancelCode = request.params.cancelCode;
    const donationId = +request.params.donationId;
    await logic.cancelDonation(cancelCode, donationId);
    response.status(202).json("Cancel Done")
})

router.put("/api/update", async (request: Request, response: Response, next: NextFunction) => {
    const donation = request.body;
    await logic.updateDonation(donation);
    response.status(202).json("Update Done")
})

export default router 