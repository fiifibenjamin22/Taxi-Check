import AfricasTalking from 'africastalking';
import * as settings from '../../app.settings.json';

export class SMSHelper{

    public africastalking = AfricasTalking({
        apiKey: settings.AFRICAS_TALKING.API_KEY, 
        username: 'sandbox'
      });

}