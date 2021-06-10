import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'subject_name' })

export class SubjectNamePipe implements PipeTransform {
  private subject: any;

  // Takes a subject name like 'design_secure' and changes it to 'Design Secure Architectures'
  transform(input: any): string {
    let words = input.split('_')
    if (words.length == 2) {
      if (words[0] == 'practice') {
        return `Practice Test`
      }
      let word1 = this.capitalize(words[0])
      let word2 = this.capitalize(words[1])
      return `${word1} ${word2} Architectures`
    } else {
      return `Design Cost-Optimized Architectures`
    }

  }

  capitalize = (s:string) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

}
