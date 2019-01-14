import { createConnection } from 'typeorm';
import { User } from '../data/entities/user.entity';
import * as bcrypt from 'bcrypt';

createConnection().then(async (conn) => {

    // Setup admins
    const usersRepository = conn.getRepository<User>(User);

    try{

    const admin1 = new User();
    admin1.email = 'georgelevov@gmail.com';
    admin1.fullname = 'George Levov';
    admin1.password = await bcrypt.hash('Root123$', 10);
    admin1.role = 'ADMIN';

    const admin2 = new User();
    admin2.email = 'iceek@gmail.com';
    admin2.fullname = 'Hristo Mirchev';
    admin2.password = await bcrypt.hash('Root321$', 10);
    admin2.role = 'ADMIN';

    await usersRepository.save(admin1);
    await usersRepository.save(admin2);
    // tslint:disable-next-line:no-console
    console.log(`~Admins added to DB~`);
    } catch (error){
        // tslint:disable-next-line:no-console
        console.log(error);
        // tslint:disable-next-line:no-console
        console.log(`Skipping admin setup \n ~please check data~`);
    }
    conn.close();
});