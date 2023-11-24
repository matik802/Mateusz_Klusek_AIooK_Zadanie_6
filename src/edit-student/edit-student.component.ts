import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { StudentClass } from '../types/student';
import { ageValidator } from '../age-validator';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
  imports:[CommonModule,FormsModule, ReactiveFormsModule],
  providers:[StudentsService],
  standalone:true,
})
export class EditStudentComponent implements OnInit {
  @Input() student4edit!:StudentClass;
  @Input() ktoryStudent:number=-1;
  @Output() doEditInParent=new EventEmitter<{student:StudentClass,ktory:number}>();

  form4edit:FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, private studentsService: StudentsService) {
    const whichStudent = this.route.snapshot.paramMap.get('id');
    console.log('edit student routed?',whichStudent);
    if(whichStudent!=null) {
        this.student4edit=this.studentsService.getStudent(Number(whichStudent));
    }
    this.form4edit = new FormGroup({
      imie: new FormControl('', Validators.required),
      nazwisko: new FormControl('', Validators.required),
      nrIndeksu:new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')])),
      dataUrodzenia: new FormControl('', Validators.compose([Validators.required, ageValidator()]))
    });

   }

  ngOnInit() {
    console.log('data ur',this.student4edit.dataUrodzenia.toISOString().slice(0, 10));
    this.form4edit.setValue(
      {imie: this.student4edit.Name, nazwisko: this.student4edit.Surname, nrIndeksu:this.student4edit.Index_nr,dataUrodzenia: this.student4edit.dataUrodzenia.toISOString().slice(0, 10)});
   }
  
   doEditStudent(){
     console.log("form", this.form4edit);
     let studentAfterEdit=new StudentClass(this.form4edit.value.imie,this.form4edit.value.nazwisko,this.form4edit.value.nrIndeksu,new Date(this.form4edit.value.dataUrodzenia));
      this.doEditInParent.emit({student:studentAfterEdit,ktory:this.ktoryStudent});
   }

}