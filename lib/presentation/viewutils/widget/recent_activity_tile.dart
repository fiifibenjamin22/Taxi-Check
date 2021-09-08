import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:customer_app/utils/strings.dart';
import 'package:customer_app/utils/time_helper.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class RecentActivityTile extends HookWidget {
  const RecentActivityTile(this.activity);

  final Map<String, dynamic> activity;

  @override
  Widget build(BuildContext context) {
    final vehicle = activity['vehicle'];
    final driver = activity['vehicle']['driver'];
    print(vehicle);
    return Padding(
      padding: EdgeInsets.only(bottom: 10),
      child: ListTile(
        tileColor: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
        leading: ClipRRect(
          borderRadius: BorderRadius.circular(100),
          child: Image.asset('${Strings.ImagePath}tmp_img.png', width: 40),
        ),
        title: Text(
          driver != null ? driver['first_name'] : 'Unknown Driver',
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
        ),
        subtitle: Text.rich(
          TextSpan(
            text: activity['vehicle_plate'],
            children: [
              TextSpan(
                text: '· Terminal N/A',
                style: TextStyle(color: AppColors.lightGrey),
              ),
            ],
            style: TextStyle(color: AppColors.primaryColor),
          ),
        ),
        trailing: Text(TimeHelper.timeAgoSinceDate(activity['createdAt'])),
      ),
    );
  }
}
