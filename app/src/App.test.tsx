///@ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { Rule } from './App';
import { run as comments } from './modules/rules/comments'
import { run as usepackage } from './modules/rules/sortUsePackage'
import { run as newLineSentance } from './modules/rules/newline'
import { readFileSync } from 'fs'
import { resolve } from 'path'

describe('Comments formatter', () => {
  describe('When there is one space', () => {
    it('nothing should change with a single line comment', () => {

      let code = "% This is a comment";
      expect(comments(code)).toBe(code);
    })
    it('nothing should change with a long single word comment', () => {

      let code = "% thisisaverylongcomment";
      expect(comments(code)).toBe(code);
    })
    it('nothing should change with code infront of the comment', () => {

      let code = "\\begin{thisonehasstufinfront} % This is a comment";
      expect(comments(code)).toBe(code);
    })
  })

  describe('When there is no space', () => {
    it('should add a space infront of the comment', () => {

      let code = "%This is a comment";
      expect(comments(code)).toBe("% This is a comment");
    })
    it('should add a space with a long single word comment', () => {

      let code = "%thisisaverylongcomment";
      expect(comments(code)).toBe("% thisisaverylongcomment");
    })
    it('should add a space with code infront of the comment', () => {

      let code = "\\begin{thisonehasstufinfront}%This is a comment";
      expect(comments(code)).toBe("\\begin{thisonehasstufinfront} % This is a comment");
    })
  })


  describe('When there more than one space', () => {
    it('should make a single space infront of the comment', () => {

      let code = "%        This is a comment";
      expect(comments(code)).toBe("% This is a comment");
    })
    it('tabs behind % should convert to space', () => {

      let code = "% thisisaverylongcomment";
      expect(comments(code)).toBe("% thisisaverylongcomment");
    })
    it('should make sure the % is sourrounded by spaces if there is text before the comment', () => {

      let code = "\\begin{thisonehasstufinfront}%This is a comment";
      expect(comments(code)).toBe("\\begin{thisonehasstufinfront} % This is a comment");
    })
  })
})


describe('Newline formatter', () => {
  describe('Formats correctly with diffrent endings', () => {
    it('should add a newline after a full stop', () => {
      const code = readFile("/testFiles/newlines/1a.tex")
      const result = readFile("/testFiles/newlines/1b.tex")
      expect(runAllNewLine(code)).toBe(result);
    })
    it('should add a newline after a ?', () => {
      const code = readFile("/testFiles/newlines/2a.tex")
      const result = readFile("/testFiles/newlines/2b.tex")
      expect(runAllNewLine(code)).toBe(result);
    })
    it('should add a newline after a !', () => {
      const code = readFile("/testFiles/newlines/3a.tex")
      const result = readFile("/testFiles/newlines/3b.tex")
      expect(runAllNewLine(code)).toBe(result);
    })
  })
})

describe('Newline before sections', () => {
  describe('Formats correctly', () => {
    const code = readFile("/testFiles/newlines/1a.tex")
    const result = readFile("/testFiles/newlines/1b.tex")
    expect(runAllNewLine(code)).toBe(result);
  })
})

describe('Newline formatter', () => {
  describe('Formats with full stop correctly', () => {
    const code = readFile("/testFiles/newlines/1a.tex")
    const result = readFile("/testFiles/newlines/1b.tex")
    expect(runAllNewLine(code)).toBe(result);
  })
})

describe('Usepackage formatter', () => {
  describe('Sorts the rules in order', () => {
    it('sorts usepackage correctly', () => {
      const code = readFile("/testFiles/usepackage/1a.tex")
      const result = readFile("/testFiles/usepackage/1b.tex")
      expect(usepackage(code)).toBe(result);
    })
    it('does nothing with no imports', () => {
      const code = readFile("/testFiles/usepackage/2a.tex")
      const result = readFile("/testFiles/usepackage/2b.tex")
      expect(usepackage(code)).toBe(result);
    })
  })
  describe('Spaces', () => {
    it('removes spaces from imports', () => {
      const code = readFile("/testFiles/usepackage/3a.tex")
      const result = readFile("/testFiles/usepackage/3b.tex")
      expect(usepackage(code)).toBe(result);
    })
    it('removes spaces all from imports', () => {
      const code = readFile("/testFiles/usepackage/3c.tex")
      const result = readFile("/testFiles/usepackage/3b.tex")
      expect(usepackage(code)).toBe(result);
    })
  })
})


function readFile(path: string) {
  return readFileSync(resolve(__dirname + path), { encoding: 'utf-8', flag: 'r' })
}

function runAllNewLine(file: string) {
  file = newLineSentance(file, ".")
  file = newLineSentance(file, "?")
  file = newLineSentance(file, "!")
  return file
}