import 'package:customer_app/presentation/view/main/complaint_screen.dart';
import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:customer_app/utils/phone_utils.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:customer_app/presentation/viewutils/widget/labelled_text.dart';
import 'package:customer_app/utils/strings.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class VehicleInfoScreen extends HookWidget {
  static const id = '/vehicle_info';

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments! as Map;
    print(args['driver']);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.darkGrey,
        elevation: 0,
      ),
      backgroundColor: AppColors.pageBackground,
      body: ListView(
        children: [
          Stack(
            children: [
              Container(
                width: double.infinity,
                color: AppColors.darkGrey,
                padding: EdgeInsets.fromLTRB(20, 0, 20, 20),
                child: Column(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(100),
                      child: Image.asset(
                        '${Strings.ImagePath}tmp_img.png',
                        width: 80,
                      ),
                    ),
                    SizedBox(height: 10),
                    Text(
                      '${args['driver']['first_name']}',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                      ),
                    ),
                    SizedBox(height: 5),
                    Text(
                      '${args['make']} ${args['model']} - ${args['plate_number']}',
                      style: TextStyle(color: Colors.grey),
                    ),
                    SizedBox(height: 30),
                    Row(
                      children: [
                        Expanded(
                          child: LabelledText(
                            label: 'License',
                            text: 'Class ${args['driver']['license']['class']}',
                          ),
                        ),
                        Expanded(
                          child: LabelledText(label: 'Trips', text: '3,000'),
                        ),
                        Expanded(
                          child: LabelledText(label: 'Years', text: '2'),
                        )
                      ],
                    )
                  ],
                ),
              ),
            ],
          ),
          Container(
            padding: EdgeInsets.only(top: 10, bottom: 30),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Padding(
                  padding: EdgeInsets.fromLTRB(20, 10, 20, 10),
                  child: Row(
                    children: [
                      Row(
                        children: [
                          IconButton(
                            onPressed: () => PhoneUtils.sendSMS(
                              args['driver']['contact']['phone_number'],
                            ),
                            iconSize: 40,
                            icon: CircleAvatar(
                              radius: 40,
                              backgroundColor: AppColors.lighterYellow,
                              foregroundColor: AppColors.primaryColor,
                              child: Icon(
                                Icons.messenger,
                                size: 20,
                              ),
                            ),
                          ),
                          IconButton(
                            onPressed: () => PhoneUtils.makePhoneCall(
                              args['driver']['contact']['phone_number'],
                            ),
                            iconSize: 40,
                            icon: CircleAvatar(
                              radius: 40,
                              backgroundColor: AppColors.lighterYellow,
                              foregroundColor: AppColors.primaryColor,
                              child: Icon(Icons.phone),
                            ),
                          )
                        ],
                      ),
                      SizedBox(width: 20),
                      Expanded(
                        child: TextButton(
                          onPressed: () => Navigator.pushNamed(
                            context,
                            ComplaintScreen.id,
                            arguments: args['plate_number'],
                          ),
                          child: Text(
                            'REPORT DRIVER',
                            style: TextStyle(color: Colors.black),
                          ),
                          style: TextButton.styleFrom(
                            backgroundColor: AppColors.primaryColor,
                            padding: EdgeInsets.symmetric(
                                horizontal: 20, vertical: 15),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                        ),
                      )
                    ],
                  ),
                ),
                Divider(),
                ListTile(
                  visualDensity: VisualDensity(horizontal: 0, vertical: -4),
                  horizontalTitleGap: 0,
                  leading: Icon(
                    Icons.location_city,
                    color: Colors.grey[400],
                  ),
                  title: Text(
                    '${args['driver']['terminal']['terminal_name']}',
                  ),
                ),
                Divider(),
                ListTile(
                  horizontalTitleGap: 0,
                  visualDensity: VisualDensity(horizontal: 0, vertical: -4),
                  leading: Icon(
                    Icons.location_on_outlined,
                    color: Colors.grey[400],
                  ),
                  title: Text(
                    '${args['driver']['address']['residential_address']}',
                  ),
                ),
                Divider(),
                ListTileTheme(
                  horizontalTitleGap: 0,
                  child: Theme(
                    data: ThemeData().copyWith(
                      dividerColor: Colors.transparent,
                    ),
                    child: ExpansionTile(
                      leading: Icon(
                        Icons.location_history_outlined,
                        color: Colors.grey[400],
                      ),
                      title: Text(
                        'Owner',
                        style: TextStyle(fontSize: 16.0),
                      ),
                      childrenPadding: EdgeInsets.zero,
                      children: <Widget>[
                        ListTile(
                          visualDensity: VisualDensity(
                            horizontal: 0,
                            vertical: -4,
                          ),
                          contentPadding: EdgeInsets.symmetric(horizontal: 58),
                          title: Text('Name'),
                          subtitle: Text(
                            '${args['owner']['first_name']} ${args['owner']['other_names']} ${args['owner']['last_name']}',
                          ),
                        ),
                        ListTile(
                          visualDensity: VisualDensity(
                            horizontal: 0,
                            vertical: -4,
                          ),
                          contentPadding: EdgeInsets.symmetric(horizontal: 58),
                          title: Text('Phone'),
                          subtitle: Text(
                            '${args['owner']['contact']['phone_number']}',
                          ),
                        )
                      ],
                    ),
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
