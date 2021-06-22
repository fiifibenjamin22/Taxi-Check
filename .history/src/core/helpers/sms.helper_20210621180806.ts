import AfricasTalking from 'africastalking';
import * as settings from '../../app.settings.json';

export default class SMSHelper{

    public static africastalking = AfricasTalking({
        apiKey: settings.AFRICAS_TALKING.API_KEY, 
        username: 'sandbox'
      });
      
    public static async sendSMS(): Promise<any>{
        try {
            const result=await this.africastalking.SMS.send({
              to: '+233241852603', 
              message: 'Hey AT Ninja! Wassup...'
            });
            console.log(result);
          } catch(ex) {
            console.error(ex);
          } 
    }

}