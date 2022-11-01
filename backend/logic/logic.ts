import Donation from "../model/donation";
import Payment from "../model/payment";
import dal from "../utils/dal";
import { OkPacket } from "mysql";


//get all donation
async function getAllDonations(): Promise<Donation[]> {
  const sql = `SELECT donation.*, payment
               FROM donation JOIN payment
               ON donation.payment_code = payment.id
  `;
  const donation = await dal.execute(sql);
  return donation;
}
//get all payments 
async function getAllPayments(): Promise<Payment[]> {
  const sql = "SELECT * FROM payment";
  const payments = await dal.execute(sql);
  return payments;
}
//add new donation
async function addDonation(donation: Donation): Promise<Donation> {
  const sql = `INSERT INTO donation Values(
    DEFAULT,
    '${donation.name}',
    '${donation.family}',
    '${donation.tel}',
     ${donation.sum},
    '${donation.auth_code}',
    '',
    ${donation.payment_code},
    '${donation.memo}'
    ) `;
  const result: OkPacket = await dal.execute(sql)
  donation.id = result.insertId
  return donation
}
//delete donation
async function deleteDonation(donationId: number): Promise<void> {
  const sql = `DELETE FROM donation WHERE id = ${donationId}`;
  const result: OkPacket = await dal.execute(sql)

}
//update donction
async function updateDonation(donation: Donation): Promise<void> {

}

//cancel donation
async function cancelDonation(cancelCode: string,donationId:number): Promise<void> {
  const sql = `UPDATE donation SET cancel_code = '${cancelCode}' WHERE (id = ${donationId})`;
  const result:OkPacket = await dal.execute(sql);
}
//update donation

export default {
  getAllDonations,
  getAllPayments,
  deleteDonation,
  addDonation,
  updateDonation,
  cancelDonation
};
