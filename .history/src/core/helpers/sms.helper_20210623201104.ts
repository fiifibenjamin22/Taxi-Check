import AfricasTalking from 'africastalking';
import * as settings from '../../app.settings.json';

export default class SMSHelper {

  public static africastalking = AfricasTalking(settings.AFRICAS_TALKING);

  public static async sendSMS(to: string, message: string): Promise<any> {

    let sms = this.africastalking.SMS;
    let params = { from: 'TAXICHECK', to, message };

    sms.send(params)
      .then(response => { console.log(response); })
      .catch(error => { console.log(error) });
  }

}