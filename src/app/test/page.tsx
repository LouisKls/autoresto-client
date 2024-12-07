'use client';

import { Button } from '@components/ui/Button/Button';
import { Checkbox } from '@components/ui/Checkbox/Checkbox';
import { IconButton } from '@components/ui/IconButton/IconButton';
import { Label } from '@components/ui/Label/Label';
import { TextField } from '@components/ui/TextField/TextField';
import { CategoryButton } from '@components/ui/CategoryButton/CategoryButton';
import {
  Plus,
  Menu
} from 'lucide-react';

const TestPage = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: "30px"}}>
        <div style={{display: 'flex',  alignItems: 'center', width: 500, marginTop: "20px"}}>
          <Label label={'Label'} />
          <div style={{width: 50}}/>
          <TextField
            label={"Text Field"}
          />
          <div style={{marginLeft: 100}}/>
          <TextField />
        </div>
        <div style={{display: 'flex',  alignItems: 'center', width: 500, marginTop: "20px"}}>
          <IconButton onClick={() => {}} square>
            <Menu color={"white"} />
          </IconButton>
          <div style={{width: 50}}/>
          <IconButton onClick={() => {}} disabled={false}>
            <Plus color={"white"} />
          </IconButton>
          <div style={{width: 50}}/><br/>
          <Button variant={'contained'} onClick={() => {}} color={'success'} thin>
            Valider ma commande
          </Button>
        </div>
        <div style={{display: 'flex',  alignItems: 'center', width: 500, marginTop: "20px"}}>
          <Checkbox
            label={"Checkbox label"}
            name={"test"}
            checked={false}
            onCheckedChange={(checked) => {}}
          />
        </div>
        <div style={{display: 'flex',  alignItems: 'center', width: 80, heigth: 80, marginTop: "20px"}}>
          <CategoryButton
            onClick={() => {}}
            label={"Viandes"}
            altImage={'Viandes'}
            imageLink={'viande.png'}
          />
          <div style={{width: 200, marginLeft: 20}}/>
          <CategoryButton
            onClick={() => {}}
            label={"Viandes"}
            altImage={'Viandes'}
            imageLink={'viande.png'}
            selected
          />
        </div>
      </div>
    );
};

export default TestPage;
