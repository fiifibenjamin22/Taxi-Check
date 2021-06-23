import AfricasTalking from 'africastalking';
import * as settings from '../../app.settings.json';

export default class SMSHelper{

    public static africastalking = AfricasTalking(settings.AFRICAS_TALKING);
      
    public static async sendSMS(): Promise<any>{
        try {
            const result=await this.africastalking.SMS.send({
              from: 'TAXICHECK',
              to: '0241852603', 
              message: 'Hey AT Ninja! Wassup...'
            });
            console.log(result);
          } catch(ex) {
            console.error(ex);
          } 
    }

}