import AfricasTalking from 'africastalking';
import * as settings from '../../app.settings.json';

export default class SMSHelper{

    public static africastalking = AfricasTalking(settings.AFRICAS_TALKING);
      
    public static async sendSMS(recipient: string, message: string): Promise<any>{
        try {
            const result=await this.africastalking.SMS.send({
              from: 'TAXICHECK',
              to: recipient, 
              message: message
            });
            console.log(result);
          } catch(ex) {
            console.error(ex);
          } 
    }

}