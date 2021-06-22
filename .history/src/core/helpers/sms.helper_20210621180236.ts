import AfricasTalking from 'africastalking';
import * as settings from '../../app.settings.json';

export class SMSHelper{

    public africastalking = AfricasTalking({
        apiKey: settings.AFRICAS_TALKING.API_KEY, 
        username: 'sandbox'
      });
      
    public async sendSMS(): Promise<any>{
        try {
            const result=await this.africastalking.SMS.send({
              to: '+233241852603', 
              message: 'Hey AT Ninja! Wassup...',
              from: 'Taxi Check'
            });
            console.log(result);
          } catch(ex) {
            console.error(ex);
          } 
    }

}