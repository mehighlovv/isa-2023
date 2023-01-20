INSERT INTO users (role, address, city, company_info, country, email, gender, lastname, name, occupation, password_hash, password_salt, phone, social_security_number, is_accepted, loyalty_points, penalties, questionaire_id, transfusion_center_id) VALUES ('REGISTERED_USER', 'Danila Kisa 15', 'Novi Sad', 'Vega IT Delta d.o.o', 'Serbia', 'test1@test.com', 'M', 'Test1', 'Test1', 'Software Engineer', null, null, 'testbroj1', 'testjmbg1', true, 0, 1, null, null)
INSERT INTO users (role, address, city, company_info, country, email, gender, lastname, name, occupation, password_hash, password_salt, phone, social_security_number, is_accepted, loyalty_points, penalties, questionaire_id, transfusion_center_id) VALUES ('REGISTERED_USER', 'Narodnog Fronta 38', 'Novi Sad', 'Akademija Umetnosti', 'Serbia', 'tes2@test.com', 'Z', 'Test2', 'Test2', 'Software Engineer', null, null, 'testbroj2', 'testjmbg2', true, 0, 1, null, null) 
INSERT INTO users (role, address, city, company_info, country, email, gender, lastname, name, occupation, password_hash, password_salt, phone, social_security_number, is_accepted, loyalty_points, penalties, questionaire_id, transfusion_center_id) VALUES ('REGISTERED_USER', '1300 Kaplara 7', 'Novi Sad', 'UniCredit Bank d.o.o', 'Serbia', 'test3@test.com', 'Z', 'Test3', 'Test3', 'Software Engineer', null, null, 'testbroj3', 'testjmbg3', true, 0, 1, null, null) 
INSERT INTO users (role, address, city, company_info, country, email, gender, lastname, name, occupation, password_hash, password_salt, phone, social_security_number, is_accepted, loyalty_points, penalties, questionaire_id, transfusion_center_id) VALUES ('REGISTERED_USER', 'Balzakova 38', 'Novi Sad', 'Cvecara Safira', 'Serbia', 'test4@test.com', 'M', 'Test4', 'Test4', 'Software Engineer', null, null, 'testbroj4', 'testjmbg4', true, 0, 0, null, null) 
INSERT INTO users (role, address, city, company_info, country, email, gender, lastname, name, occupation, password_hash, password_salt, phone, social_security_number, is_accepted, loyalty_points, penalties, questionaire_id, transfusion_center_id) VALUES ('REGISTERED_USER', 'Pavla Papa 2', 'Novi Sad', 'Restoran BellaVile', 'Serbia', 'test5@test.com', 'M', 'Test5', 'Test5', 'Software Engineer', null, null, 'testbroj5', 'testjmbg5', false, 0, 2, null, null) 
INSERT INTO users (role, address, city, company_info, country, email, gender, lastname, name, occupation, password_hash, password_salt, phone, social_security_number, is_accepted, loyalty_points, penalties, questionaire_id, transfusion_center_id) VALUES ('REGISTERED_USER', 'Jase Tomica 17', 'Novi Sad', 'Synechron', 'Serbia', 'test6@test.com', 'M', 'Test6', 'Test6', 'Software Engineer', null, null, 'testbroj6', 'testjmbg6', true, 0, 0, null, null) 

INSERT INTO transfusion_centers (name, address, description, working_hours_begin, working_hours_end, administrator_id) VALUES ('CenterTest1', 'TestAddress1', 'TestDescription1', '08:00', '16:00', null)
INSERT INTO transfusion_centers (name, address, description, working_hours_begin, working_hours_end, administrator_id) VALUES ('CenterTest2', 'TestAddress2', 'TestDescription2', '08:00', '16:00', null)
INSERT INTO transfusion_centers (name, address, description, working_hours_begin, working_hours_end, administrator_id) VALUES ('CenterTest3', 'TestAddress3', 'TestDescription3', '08:00', '16:00', null)
INSERT INTO transfusion_centers (name, address, description, working_hours_begin, working_hours_end, administrator_id) VALUES ('CenterTest4', 'TestAddress4', 'TestDescription4', '08:00', '16:00', null)
INSERT INTO transfusion_centers (name, address, description, working_hours_begin, working_hours_end, administrator_id) VALUES ('CenterTest5', 'TestAddress5', 'TestDescription5', '08:00', '16:00', null)
INSERT INTO transfusion_centers (name, address, description, working_hours_begin, working_hours_end, administrator_id) VALUES ('CenterTest6', 'TestAddress6', 'TestDescription6', '08:00', '16:00', null)

INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription1', 1, 1, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription2', 1, 2, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription3', 1, 3, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription4', 1, 4, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription5', 1, 5, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription6', 1, 6, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription1', 2, 1, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription2', 2, 2, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription3', 2, 3, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription4', 3, 4, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription5', 3, 5, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription6', 3, 6, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription1', 5, 1, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription2', 5, 2, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription3', 5, 3, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription4', 5, 4, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription5', 5, 5, null)
INSERT INTO complaints (complaint_type, description, complainee_id, transfusion_center_id, staff_id) VALUES ('TRANSFUSION_CENTER_COMPLAINT', 'TestDescription6', 5, 6, null)

INSERT INTO users (role, address, city, company_info, country, email, gender, lastname, name, occupation, password_hash, password_salt, phone, social_security_number, is_accepted, loyalty_points, penalties, questionaire_id, transfusion_center_id) VALUES ('TRANSFUSION_CENTER_ADMIN', 'Danila Kisa 15', 'Novi Sad', 'Vega IT Delta d.o.o', 'Serbia', 'test7@test.com', 'M', 'Test1', 'Test1', 'Test', null, null, 'testbroj1', 'testjmbg1', true, 0, 1, null, 1)
INSERT INTO users (role, address, city, company_info, country, email, gender, lastname, name, occupation, password_hash, password_salt, phone, social_security_number, is_accepted, loyalty_points, penalties, questionaire_id, transfusion_center_id) VALUES ('TRANSFUSION_CENTER_ADMIN', 'Narodnog Fronta 38', 'Novi Sad', 'Akademija Umetnosti', 'Serbia', 'tes8@test.com', 'Z', 'Test2', 'Test2', 'Test', null, null, 'testbroj2', 'testjmbg2', true, 0, 1, null, 2) 
INSERT INTO users (role, address, city, company_info, country, email, gender, lastname, name, occupation, password_hash, password_salt, phone, social_security_number, is_accepted, loyalty_points, penalties, questionaire_id, transfusion_center_id) VALUES ('TRANSFUSION_CENTER_ADMIN', '1300 Kaplara 7', 'Novi Sad', 'UniCredit Bank d.o.o', 'Serbia', 'test9@test.com', 'Z', 'Test3', 'Test3', 'Test', null, null, 'testbroj3', 'testjmbg3', true, 0, 1, null, 3) 
INSERT INTO users (role, address, city, company_info, country, email, gender, lastname, name, occupation, password_hash, password_salt, phone, social_security_number, is_accepted, loyalty_points, penalties, questionaire_id, transfusion_center_id) VALUES ('TRANSFUSION_CENTER_ADMIN', 'Balzakova 38', 'Novi Sad', 'Cvecara Safira', 'Serbia', 'test10@test.com', 'M', 'Test4', 'Test4', 'Test', null, null, 'testbroj4', 'testjmbg4', true, 0, 0, null, 4) 
INSERT INTO users (role, address, city, company_info, country, email, gender, lastname, name, occupation, password_hash, password_salt, phone, social_security_number, is_accepted, loyalty_points, penalties, questionaire_id, transfusion_center_id) VALUES ('TRANSFUSION_CENTER_ADMIN', 'Pavla Papa 2', 'Novi Sad', 'Restoran BellaVile', 'Serbia', 'test11@test.com', 'M', 'Test5', 'Test5', 'Test', null, null, 'testbroj5', 'testjmbg5', false, 0, 2, null, 5) 
INSERT INTO users (role, address, city, company_info, country, email, gender, lastname, name, occupation, password_hash, password_salt, phone, social_security_number, is_accepted, loyalty_points, penalties, questionaire_id, transfusion_center_id) VALUES ('TRANSFUSION_CENTER_ADMIN', 'Jase Tomica 17', 'Novi Sad', 'Synechron', 'Serbia', 'test12@test.com', 'M', 'Test6', 'Test6', 'Test', null, null, 'testbroj6', 'testjmbg6', true, 0, 0, null, 6) 


INSERT INTO questionaires (answer_to_first_question, answer_to_second_question, answer_to_third_question, answer_to_fourth_question, answer_to_fifth_question, answer_to_sixth_question, answer_to_seventh_question, answer_to_eighth_question, answer_to_nineth_question, answer_to_tenth_question, answer_to_eleventh_question, answer_to_twelfth_question, answer_to_thirteenth_question, answer_to_fourteenth_question, answer_to_fifteenth_question, answer_to_sixteenth_question, answer_to_seventeenth_question, answer_to_eighteenth_question, answer_to_nineteenth_question, answer_to_twentieth_question, answer_to_twenty_first_question, answer_to_twenty_second_question, answer_to_twenty_third_question, answer_to_twenty_fourth_question, answer_to_twenty_fifth_question, answer_to_twenty_sixth_question, user_id) VALUES (false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, 1)
INSERT INTO questionaires (answer_to_first_question, answer_to_second_question, answer_to_third_question, answer_to_fourth_question, answer_to_fifth_question, answer_to_sixth_question, answer_to_seventh_question, answer_to_eighth_question, answer_to_nineth_question, answer_to_tenth_question, answer_to_eleventh_question, answer_to_twelfth_question, answer_to_thirteenth_question, answer_to_fourteenth_question, answer_to_fifteenth_question, answer_to_sixteenth_question, answer_to_seventeenth_question, answer_to_eighteenth_question, answer_to_nineteenth_question, answer_to_twentieth_question, answer_to_twenty_first_question, answer_to_twenty_second_question, answer_to_twenty_third_question, answer_to_twenty_fourth_question, answer_to_twenty_fifth_question, answer_to_twenty_sixth_question, user_id) VALUES (false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, 2)
INSERT INTO questionaires (answer_to_first_question, answer_to_second_question, answer_to_third_question, answer_to_fourth_question, answer_to_fifth_question, answer_to_sixth_question, answer_to_seventh_question, answer_to_eighth_question, answer_to_nineth_question, answer_to_tenth_question, answer_to_eleventh_question, answer_to_twelfth_question, answer_to_thirteenth_question, answer_to_fourteenth_question, answer_to_fifteenth_question, answer_to_sixteenth_question, answer_to_seventeenth_question, answer_to_eighteenth_question, answer_to_nineteenth_question, answer_to_twentieth_question, answer_to_twenty_first_question, answer_to_twenty_second_question, answer_to_twenty_third_question, answer_to_twenty_fourth_question, answer_to_twenty_fifth_question, answer_to_twenty_sixth_question, user_id) VALUES (false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, 3)

UPDATE users SET questionaire_id=1 WHERE id=1
UPDATE users SET questionaire_id=2 WHERE id=2


INSERT INTO terms (begin_date, duration_in_minutes, type, reserver_id, transfusion_center_id, transfusion_center_administrator_id) VALUES ('2023-02-19 19:00:00', 30, 'PREDEFINED', null, 1, 7)
INSERT INTO terms (begin_date, duration_in_minutes, type, reserver_id, transfusion_center_id, transfusion_center_administrator_id) VALUES ('2022-02-09 14:00:00', 30, 'NEW', 1, 1, 7)
INSERT INTO terms (begin_date, duration_in_minutes, type, reserver_id, transfusion_center_id, transfusion_center_administrator_id) VALUES ('2021-08-09 13:30:00', 30, 'PREDEFINED', 1, 1, 7)
INSERT INTO terms (begin_date, duration_in_minutes, type, reserver_id, transfusion_center_id, transfusion_center_administrator_id) VALUES ('2021-02-09 10:00:00', 30, 'PREDEFINED', 1, 1, 7)
INSERT INTO terms (begin_date, duration_in_minutes, type, reserver_id, transfusion_center_id, transfusion_center_administrator_id) VALUES ('2020-08-09 09:00:00', 30, 'PREDEFINED', 1, 1, 7)

UPDATE transfusion_centers SET administrator_id=7 WHERE id=1
UPDATE transfusion_centers SET administrator_id=8 WHERE id=2
UPDATE transfusion_centers SET administrator_id=9 WHERE id=3
UPDATE transfusion_centers SET administrator_id=10 WHERE id=4
UPDATE transfusion_centers SET administrator_id=11 WHERE id=5
UPDATE transfusion_centers SET administrator_id=12 WHERE id=6