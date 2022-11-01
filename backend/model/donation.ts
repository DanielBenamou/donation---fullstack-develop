
class Donation{
   public id:number = 0
   public name:string = "";
   public family:string = "";
   public tel:number = 0;
   public sum:number = 0;
   public auth_code:string = "";
   public cancel_code:string = "";
   public payment_code:number = 0;
   public memo:string = "";

  constructor(donation:Donation) {
    this.name = donation.name;
    this.family = donation.family;
    this.tel = donation.tel;
    this.sum = donation.sum;
    this.auth_code = "";
    this.cancel_code = "";
    this.payment_code = donation.payment_code;
    this.memo = donation.memo;
  }

}

export default Donation

